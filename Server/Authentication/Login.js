import express from 'express';
import dotenv from 'dotenv';
import { getDb} from '../Db_connection/Databaseconnection.js';
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';

dotenv.config();

const Login_Router = express.Router();

Login_Router.post('/',async(req,res)=>{
    const {email,password}=req.body;
    const db=await getDb();
    const collection=db.collection('admins');
    try{
        const User = await collection.findOne({email});
        if(!User || !bcrypt.compareSync(password, User.password)){
            return res.status(409).json({ message: 'Invalid email or password' });
        } 
        const token = jwt.sign({email:User.email}, process.env.JWT_SECRET, { expiresIn: '1h' });
        const userAuth={hospital:User.hospital,Roll:User.Roll}
        res.status(201).json({ message: 'Login Sucessfull.',token:token,user:userAuth});
    }catch(error){
        // console.log(error);
        return res.status(409).json({ message: 'Invalid email or password' });
    }
});

export default Login_Router;