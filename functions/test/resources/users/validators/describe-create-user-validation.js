const chai = require('chai')
const expect = chai.expect;

const { verifyResultOk , verifyResultError } = require('../../../helpers/verifiers');
const CreateUserValidation = require('../../../../resources/users/validators/create-user-validation')

describe.only('Create User Validation', () => {
    it('should mandate full name', async() => {
        let response = await CreateUserValidation.validate({})

        verifyResultError(
            (error) => {
                expect(error.errorMessage).to.include("Name is mandatory!");
            }
        )(response);
    })

    it('should mandate email', async() => {
        let response = await CreateUserValidation.validate({})

        verifyResultError(
            (error) => {
                expect(error.errorMessage).to.include("Email is mandatory!");
            }
        )(response);
    })

    it('should be a valid email', async() => {
        let response = await CreateUserValidation.validate({email : 'user'})

        verifyResultError(
            (error) => {
                expect(error.errorMessage).to.include("It is not valid email!");
            }
        )(response);
    })

    it('should mandate mobile', async() => {
        let response = await CreateUserValidation.validate({})

        verifyResultError(
            (error) => {
                expect(error.errorMessage).to.include("Mobile is mandatory!");
            }
        )(response);
    })

    it('should be a valid mobile', async() => {
        let response = await CreateUserValidation.validate({mobile : '90976'})

        verifyResultError(
            (error) => {
                expect(error.errorMessage).to.include("It is not valid mobile number!");
            }
        )(response);
    })


    it('should mandate password', async() => {
        let response = await CreateUserValidation.validate({})

        verifyResultError(
            (error) => {
                expect(error.errorMessage).to.include("Password is mandatory!");
            }
        )(response);
    })

    it('should be a valid password (length is greater than 4)', async() => {
        let response = await CreateUserValidation.validate({password : 'a'})

        verifyResultError(
            (error) => {
                expect(error.errorMessage).to.include("Minimum length of password should be greater than 4!");
            }
        )(response);
    })
    it('should check password is equal to confirm password', async() => {
        let response = await CreateUserValidation.validate({password : 'qwert' , confirmPassword : 'abcde'})

        verifyResultError(
            (error) => {
                expect(error.errorMessage).to.include("Confirm Password should be equal Password!");
            }
        )(response);
    })


    it('should be valid when you provide all data', async() => {
        let response = await CreateUserValidation.validate({fullName : "Test Uset",email:"test@gmail.com",password : 'test231' , confirmPassword : "test231" , mobile : '9876543210' ,countryCode : 91})

        verifyResultOk(
            () => {}
        )(response);
    })
}) 