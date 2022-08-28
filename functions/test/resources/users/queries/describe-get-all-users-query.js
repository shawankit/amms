const chai = require('chai');
const { expect } = chai;
const uuid = require('uuid');
const db = require('db/repository');
const ds = require('helpers/dataSetup');
const RunQuery = require("data/run-query");
const { resolveDbResult , resolveOk , resolveError , resolveValidationError } = require('helpers/resolvers');
const { verifyResultOk , verifyResultError , verifyAgs} = require('../../../helpers/verifiers');
const GetAllUsersQuery = require('resources/users/queries/get-all-users-query.js');

describe.only('Get All Users Query', () => {
    let users = [];
    beforeEach(async() => {
        for(let i = 0 ; i < 3 ; i++)
            users.push(await ds.createSingle(ds.user));
    })

    it('should get all users', async () => {

        const fetchedUsersResponse = await db.execute(new GetAllUsersQuery())
        verifyResultOk((fetchedUsers) => {
            fetchedUsers.forEach((user,index) => {
                expect(user.name).eq(users[index].fullName);
                expect(user.email).eq(users[index].email);
                expect(user.mobile).eq(users[index].mobile);
                expect(user.password).eq(users[index].password);
            });
            
        })(fetchedUsersResponse);
    })

    after(async() => {
        await ds.deleteAll();
    })
});