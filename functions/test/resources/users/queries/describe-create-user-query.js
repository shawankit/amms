const chai = require('chai');
const { expect } = chai;
const uuid = require('uuid');
const db = require('db/repository');
const ds = require('helpers/dataSetup');
const RunQuery = require("data/run-query");
const { resolveDbResult , resolveOk , resolveError , resolveValidationError } = require('helpers/resolvers');
const { verifyResultOk , verifyResultError , verifyAgs} = require('../../../helpers/verifiers');
const CreateUserQuery = require('resources/users/queries/create-user-query');

describe.only('Create User Query', () => {
    let user;
    beforeEach(async() => {
        user = await ds.buildSingle(ds.user);
    })

    it('should create user', async () => {
        const {id,fullName,email,countryCode,password,mobile} = user;

        const createdUserResponse = await db.execute(new CreateUserQuery(id,fullName,email,password,mobile))
        verifyResultOk((createdUser) => {
            expect(fullName).eq(createdUser.name);
            expect(email).eq(createdUser.email);
            expect(mobile).eq(createdUser.mobile);
            expect(password).eq(createdUser.password);
        })(createdUserResponse);


        const fetchUserResponse = await db.findOne(new RunQuery('select * from public.users where email=:email',{email}));
        verifyResultOk((createdUser) => {
            expect(fullName).eq(createdUser.name);
            expect(email).eq(createdUser.email);
            expect(mobile).eq(createdUser.mobile);
            expect(password).eq(createdUser.password);
        })(fetchUserResponse);
    })

    after(async() => {
        await ds.deleteAll();
    })

    
});