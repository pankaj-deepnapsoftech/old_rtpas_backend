const {Schema,model} = require("mongoose");


const ScrapSchema = new Schema({
    Scrap_name:{type:String,required:true},
    Scrap_id:{type:String,required:true,unique:true},
    price:{type:Number,default:0},
    Extract_from:{type:String,required:true},
    Category:{type:String,required:true},
    qty:{type:Number,required:true,default:0},
    description:{type:String}
});


exports.ScrapModel = model("Scrap-data",ScrapSchema);






