const mongoose = require("mongoose")

let kindScheme = mongoose.Schema({
     kindName:{type:String,required:true},

})

let kindModel = mongoose.model("kinds",kindScheme)
module.exports = kindModel


