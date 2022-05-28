const express=require('express');
const cors=require('cors')
const morgan=require('morgan')
const bodyParse=require('body-parser')
const mongoose=require('mongoose')
const dotenv=require('dotenv')
const cookieParser=require('cookie-parser')

const PORT=8080

const app=express()

app.use(morgan('common'))
app.use(cors())
app.use(bodyParse.json())
app.use(express.json())


app.listen(PORT,()=>{
    console.log("Server is running!");
})