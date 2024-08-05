import express from 'express';
import dotenv from 'dotenv';
import { getDb} from '../Db_connection/Databaseconnection.js';
import bcrypt from "bcryptjs";
import { encryptToken } from './jwtToken.js';

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
        const encryptedToken=encryptToken(User);
        res.cookie('auth_token', encryptedToken, {
            httpOnly: true, // Secure flag (use 'secure: true' in production)
            secure: true, // Ensure HTTPS in production
            maxAge: 3600000, // 1 hour
            sameSite: 'Strict' // Prevent CSRF
          });
        const userAuth={hospital:User.hospital,Roll:User.Roll}
        res.status(201).json({ message: `Signed in as \n ${User.email}`,user:userAuth});
    }catch(error){
        return res.status(409).json({ message: 'Invalid email or password' });
    }
});

export default Login_Router;