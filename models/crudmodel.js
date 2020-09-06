const mongoose = require('mongoose')
const { ObjectId }=mongoose.Schema.Types;
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    postedBy:{
        type:ObjectId,
        ref: "Auth"

    }
});

module.exports=mongoose.model("User", userSchema);