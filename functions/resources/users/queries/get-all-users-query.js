const { User } = require("./../../../models");


module.exports = class GetAllUsersQuery {
    constructor(){
        this.details = {}
    }

    get(){
        return User.findAll();
    }
}