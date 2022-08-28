const ApiError = require('lib/functional/api-error');
const ValidationError = require('lib/validation-error');
const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { expect } = chai;
const TestRoutes = require('helpers/test-route');
chai.use(sinonChai);
const uuid = require('uuid');
const db = require('db/repository');
const { resolveDbResult , resolveOk , resolveError , resolveValidationError } = require('helpers/resolvers');
const { verifyAgs } = require('helpers/verifiers');

describe.only('Get All Users Api', () => {
    let sandBox = sinon.createSandbox();
    let req,res;
    beforeEach(() => {
        req = {

        }
        
        res = {
            setHeader : sandBox.spy(),
            send : sandBox.spy(),
            status : sandBox.spy(() => {
                return res;
            })
        }
    })

    afterEach(() => {
        sandBox.verifyAndRestore();
    })


    it('should get all users when everything is fine' , async () => {
        sandBox.mock(db)
            .expects('find')
            .returns(resolveOk([

            ]))

        const response = await TestRoutes.execute('/users','Get',req,res);
        
        expect(response).to.eql({
            status : true,
            message : "Successfully Fetched All Users",
            entity : []
        })
    })

    it('should not get all users when something went wrong' , async () => {

        sandBox.mock(db).expects('find').returns(resolveError('Some Error'))

        const response = await TestRoutes.executeWithError('/users','Get',req,res);
        
        expect(response).to.eql(new ApiError(0, 'Some Error' ,'Failed to fetch users'));
    })

})