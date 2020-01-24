const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
        firstname:String,
        lastname:String,
        emailid:{type:String,index:{unique:true}},
        phno:Number,
        password:String,
        sell:[{}]
    }
);
const Users = mongoose.model('users',UserSchema);
module.exports = Users;