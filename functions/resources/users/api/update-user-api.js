const Route = require('route');
const { logInfo } = require('lib/functional/logger');
const { respond , whenResult} = require('lib');
const uuid = require('uuid');
const Result = require('folktale/result');
const db = require('db/repository');
const UpdateUserQuery = require('../queries/update-user-query');
const UpdateUserValidation = require("../validators/update-user-validation");


const put = async (req) => {
    const { fullName, email , password , confirmPassword , mobile } = req.body;

    logInfo('Request to update user',fullName);

    const userId = req.params.id;

    const validateResult = await UpdateUserValidation.validate({userId ,fullName, email , password , confirmPassword , mobile})

    const response = await whenResult(
        () => {
            return db.execute(new UpdateUserQuery(userId,fullName,email,password , mobile));;
        }
    )(validateResult)

    return respond(response,'Successfully Updated User', 'Failed to update User')
}


Route.withOutSecurity().noAuth().put('/users/:id',put).bind();
