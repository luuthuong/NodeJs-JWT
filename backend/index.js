const express=require('express');
const cors=require('cors')
const morgan=require('morgan')
const bodyParse=require('body-parser')
const mongoose=require('mongoose')
const dotenv=require('dotenv')
const cookieParser=require('cookie-parser')

const authRoute=require('./routes/auth')
const userRoute=require('./routes/user')
const PORT=8080
dotenv.config()

mongoose.connect(process.env.MONGO_URL,()=>{
    console.log("Mongoodb is connected");
})
const app=express()

app.use(morgan('common'))
app.use(cors())
app.use(bodyParse.json())
app.use(express.json())
app.use(cookieParser())

// Route
app.use('/api',authRoute)
app.use('/api/usr',userRoute)

app.listen(PORT,()=>{
    console.log("Server is running!");
})
// Authentication && Authorization