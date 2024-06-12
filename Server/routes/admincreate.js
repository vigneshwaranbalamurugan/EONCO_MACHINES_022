import express from 'express';
import { getDb} from '../Databaseconnection.js';
import bcrypt from "bcryptjs";
import { MongoClient } from 'mongodb';

const Admin_Router = express.Router();

Admin_Router.post('',async(req,res)=>{
    const db=await getDb();
    const collections = await Promise.all([db.collection('admins'), db.collection('hospitals')]);
    try {
        const {email,password,hsptl_name}=req.body;
        const validBranch = await collections[1].findOne({hsptl_name});
        if(!validBranch){
            return res.status(409).json({ message: 'No Branch Exists.' });
        }
        const existadmin = await collections[0].findOne({email:email});
        if(existadmin){
            return res.status(409).json({ message: 'Admin already exits.' });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        await collections[0].insertOne({ email:email,hospital:validBranch._id,password:hashedPassword});
        return res.status(201).json({ message: 'Admin Created Sucessfully.' });
    }catch (error) {
        console.error('Error creating admin:', error);
      }

});

export default Admin_Router;