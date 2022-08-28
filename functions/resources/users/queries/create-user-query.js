const { User } = require("./../../../models");


module.exports = class CreateUserQuery {
    constructor(userId,name,email,password,mobile){
        this.details = {
            id : userId,
            name,
            email,
            password,
            mobile
        }
    }

    get(){
        return User.create({...this.details})
    }
}