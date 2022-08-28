const {
    validate,
    notEmpty,
    isEmail,
    isMobileNumber
} = require('validation');

const rules = {
    fullName : [
        [notEmpty,"Name is mandatory!"]
    ],
    email : [
        [notEmpty,"Email is mandatory!"],
        [isEmail,"It is not valid email!"]
    ],
    password : [
        [notEmpty,"Password is mandatory!"],
        [(value) => value && value.length > 4 , "Minimum length of password should be greater than 4!"]
    ],
    confirmPassword : [
        [notEmpty,"Confirm Password is mandatory!"],
        [(value , data) => value == data.password , "Confirm Password should be equal Password!"] 
    ],
    mobile : [
        [notEmpty,"Mobile is mandatory!"],
        [isMobileNumber,"It is not valid mobile number!"]
    ]
}

module.exports.validate = async data => validate(rules,data);