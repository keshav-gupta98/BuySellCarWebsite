const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Car = new Schema(
    {
        id:String,
        heading:String,
        price:String,
        miles:String,
        interior_color:String,
        exterior_color:String,
        media:{photo_links:{type:Array}},
        build:{year:String,model:String,make:String,body_type:String,transmission:String,engine:String,doors:String,cylinders:String,fuel_type:String,made_in:String,overall_height:String,overall_width:String,std_seating:String},
        dealer:{website:String,name:String,dealer_type:String,phone:String,street:String,city:String,state:String,country:String}
    }
);
const UsedCar = mongoose.model('usedcar',Car);
module.exports = UsedCar;