const express=require("express")
const mongoose=require("mongoose")
const cors = require("cors")
const bodyParser=require("body-parser")

const app = express()
const port = 5005


app.use(cors())
app.use(bodyParser.json())


mongoose.connect("mongodb+srv://alpmelih:AlpMelih@gym-app.nnkzwkg.mongodb.net/?retryWrites=true&w=majority&appName=Gym-App",{
   
}).then(()=>{
    console.log("MONGO DB BAĞLANDI")
}).catch(err=>console.log(err))

const User =require("./Models/User")
app.use("/api/auth",require("./routes/auth"))

app.listen(port,()=>{
    console.log(`Şu portta çalışıyor ${port}`)
})