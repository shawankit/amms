const { User } = require("./../../../models");


module.exports = class UpdateUserQuery {
    constructor(userId,name,email,password,mobile){
        this.details = {
            id : userId,
            name,
            email,
            password,
            mobile
        }
    }

    async get(){
        const id =  this.details.id;
        const user = await User.findOne({ where: { id } })

        user.name = this.details.name;
        user.email = this.details.email;
        user.password = this.details.password;
        user.mobile = this.details.mobile;

        await user.save()

        return user
    }
}