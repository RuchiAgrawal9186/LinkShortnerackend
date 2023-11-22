const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
require("dotenv").config()

const {urlRouter} = require("./routes/Url.routes")
const app = express()

// set html and static files
// app.set("view engine","ejs")
// app.use(express.static("public"))


app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())

// mongoDB Connection

mongoose.connect(process.env.url)

const db = mongoose.connection;

db.on("error",()=>{
    console.log("Error")
})

db.once("open",()=>{
   console.log("Connected")
})






// routes

app.use("/",urlRouter)


const PORT = process.env.PORT || 8080


//  server start

app.listen(PORT ,()=>{
    console.log("server is running")
})