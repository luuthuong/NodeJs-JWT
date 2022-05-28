const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        minlength:5,
        maxlength:20,
        unique:true
    },
    password:{
        type:String,
        require:true,
        minlength:5,
    },
    email:{
        type:String,
        require:true,
        minlength:10,
        unique:true
    },
    admin:{
        type:Boolean,
        default:false
    }
},{timestamps:true})

module.exports= mongoose.model("User",userSchema)