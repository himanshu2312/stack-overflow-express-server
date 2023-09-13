import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import userRouter from "./routes/user.js"
import questionRouter from "./routes/question.js"
import answerRouter from "./routes/answer.js"
import dotenv from 'dotenv'

const app = express();
dotenv.config()

app.use(express.json({limit: "30mb",extended: true}))
app.use(express.urlencoded({limit:"30mb",extended:true}))
app.use(cors())

app.get('/',(req,res)=>{
      res.send("Stack Overflow API Running")
})

app.use('/user',userRouter)
app.use('/questions',questionRouter)
app.use('/answers',answerRouter)

const PORT = process.env.PORT || 5000
const DATABASE_URL = process.env.CONNECTION_URL

mongoose.connect( DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=> app.listen(PORT, ()=> console.log(`server running on ${PORT}`)))
.catch(e => console.log(e))

 
