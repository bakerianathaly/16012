import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import { User } from './user.js'

const app = express()
dotenv.config()
const port = 3005 

app.use(cors({origin: '*'})) //Habilitar los cors
app.use(express.json({limit: '50mb'}))
app.use(express.urlencoded({extended: false}))

const conncectDB = () => {
    const {
        MONGO_USERNAME,
        MONGO_PASSWORD,
        MONGO_PORT,
        MONGO_DB,
        MONGO_HOSTNAME
    } = process.env

    const url = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`

    mongoose.connect(url).then(()=>{
        console.log('Conexion a Mongo exitosa')
    }).catch((err) =>{
        console.log(err)
    })
}


app.listen(port, () => {
    conncectDB()
    console.log('Api corriendo en: http://localhost:3005')
})

app.get('/', async (req, res) => {
    console.log('Mi primer endpoint')
    res.status(200).send('Hola mundo, mi primera API!')  
})

app.post('/jose', async (req,res) => {
    try{
        var data = req.body
        var newUser= new User(data)
        await newUser.save()

        res.status(200).send('Se registro exitosamente el usuario.')
    }catch(err){
        res.status(400).send(err)
    }
})

app.get('/luis', async (req, res) => {
    try{
        var usarios = await User.find().exec()
        res.status(200).send(usarios)  
    }catch(err){
        res.status(400).send(err)
    }
})