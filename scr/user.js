import mongoose from "mongoose";
const Schema = mongoose.Schema

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlenght: 9
    },
    role:{
        type: String,
        required: true,
        enum: ['ADMIN','MANAGER','EMPLEADO']
    }
})

const User = mongoose.model('User', userSchema)
export {User}