const mongoose = require("mongoose");

const inputanSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    tasks : [{
        teks : {
            type : String,
            required : true
        },
        checkbox : {
            type : Boolean,
            default : false
        }
    }]
})

module.exports = mongoose.model("SchemaInputan",inputanSchema);