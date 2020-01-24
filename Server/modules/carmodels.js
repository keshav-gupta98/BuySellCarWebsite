const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
        car:String,
        company:String,
        fuel:String,
        gear_type:String,
        body_type:String
    }
);
const Car = mongoose.model('cartype',UserSchema);
module.exports = Car;