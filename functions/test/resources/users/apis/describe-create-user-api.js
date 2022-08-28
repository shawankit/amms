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
const CreateUserValidation = require("resources/users/validators/create-user-validation")

describe.only('Create User api', () => {
    let sandBox = sinon.createSandbox();
    let req,res;
    beforeEach(() => {
        req = {
            body : {
                fullName : 'Test User',
                email : 'testuser@gmail.com',
                password : 'GG4K.Czb%.tNJ+6',
                confirmPassword : 'GG4K.Czb%.tNJ+6',
                mobile : '9876543210',
                countryCode : '91'
            }
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

    it('should create a new user when all data validated' , async () => {
        const userId = uuid.v4();

        sandBox.mock(uuid).expects("v4").returns(userId);

        sandBox.mock(CreateUserValidation).expects('validate').returns(resolveOk([]));

        sandBox.mock(db)
            .expects('execute')
            .returns(resolveOk({
                id : userId,
                fullName : 'Test User',
                email : 'testuser@gmail.com',
                password : 'GG4K.Czb%.tNJ+6',
                confirmPassword : 'GG4K.Czb%.tNJ+6',
                mobile : '9876543210',
                countryCode : '91'
            }))

        const response = await TestRoutes.execute('/users','Post',req,res);
        
        expect(response).to.eql({
            status : true,
            message : "Successfully Created User",
            entity : {
                id : userId,
                fullName : 'Test User',
                email : 'testuser@gmail.com',
                password : 'GG4K.Czb%.tNJ+6',
                confirmPassword : 'GG4K.Czb%.tNJ+6',
                mobile : '9876543210',
                countryCode : '91'
            }
        })
    })

    it('should not create a new user when something went wrong' , async () => {
        sandBox.mock(CreateUserValidation).expects('validate').returns(resolveOk([]));

        sandBox.mock(db).expects('execute').returns(resolveError("Some Error"))

        const response = await TestRoutes.executeWithError('/users','Post',req,res);
       
        expect(response).to.eql(new ApiError(0, "Some Error" ,"Failed to Create User"));
    });

    
    it('should not create a new user when Name is not provided' , async () => {
        sandBox.mock(CreateUserValidation)
            .expects('validate')
            .returns(resolveValidationError("Name is mandatory!"));

        const response = await TestRoutes.executeWithError('/users','Post',req,res);
       
        expect(response).to.eql(new ValidationError(0, "Name is mandatory!"));
    });

    it('should not create a new user when Password is not provided' , async () => {
        sandBox.mock(CreateUserValidation)
            .expects('validate')
            .returns(resolveValidationError(["Password is mandatory!","Confirm Password is mandatory!"]));

        const response = await TestRoutes.executeWithError('/users','Post',req,res);
       
        expect(response).to.eql(new ValidationError(0, ["Password is mandatory!","Confirm Password is mandatory!"]));
    });

    it('should not create a new user when email is not provided' , async () => {
        sandBox.mock(CreateUserValidation)
            .expects('validate')
            .returns(resolveValidationError("Email is mandatory!"));

        const response = await TestRoutes.executeWithError('/users','Post',req,res);
       
        expect(response).to.eql(new ValidationError(0, "Email is mandatory!"));
    });

    it('should not create a new user when email is not valid' , async () => {
        sandBox.mock(CreateUserValidation)
             .expects('validate')
             .returns(resolveValidationError("It is not valid email!"));
 
         const response = await TestRoutes.executeWithError('/users','Post',req,res);
        
         expect(response).to.eql(new ValidationError(0, "It is not valid email!"));
     });

    it('should not create a new user when mobile is not provided' , async () => {
        sandBox.mock(CreateUserValidation)
            .expects('validate')
            .returns(resolveValidationError("Mobile is mandatory!"));

        const response = await TestRoutes.executeWithError('/users','Post',req,res);
       
        expect(response).to.eql(new ValidationError(0, "Mobile is mandatory!"));
    });

    it('should not create a new user when mobile number is not valid' , async () => {
        sandBox.mock(CreateUserValidation)
            .expects('validate')
            .returns(resolveValidationError("It is not valid mobile number!"));

        const response = await TestRoutes.executeWithError('/users','Post',req,res);
       
        expect(response).to.eql(new ValidationError(0, "It is not valid mobile number!"));
    });
})

