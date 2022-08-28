const Route = require('route');
const { logInfo } = require('lib/functional/logger');
const { respond , whenResult , composeResult} = require('lib');
const uuid = require('uuid');
const Result = require('folktale/result');
const db = require('db/repository');
const CreateUserQuery = require('../queries/create-user-query');
const CreateUserValidation = require("../validators/create-user-validation")


const post = async (req) => {
    const { fullName , email , password , confirmPassword , mobile } = req.body;

    logInfo('Request to create user',fullName);

    const userId = uuid.v4();

    const response = await composeResult(
        () => {
            return db.execute(new CreateUserQuery(userId,fullName,email,password,mobile));
        },
        (details) => {
            return CreateUserValidation.validate(details);
        }
    )({fullName, email , password,confirmPassword,mobile});

    return respond(response,'Successfully Created User', 'Failed to Create User')
}


Route.withOutSecurity().noAuth().post('/users',post).bind();
