import express from 'express';
import { getDb} from '../Databaseconnection.js';
const Hospital_Router = express.Router();

Hospital_Router.post('',async (req,res) => {
   const {hsptl_name,location}=req.body;
   const db= await getDb();
   const collection = db.collection('hospitals');
   try {
       const existingHospital = await collection.findOne({ hsptl_name});
       if (existingHospital) {
        return res.status(409).json({ message: 'Hospital already exists.' });
       }
       await collection.insertOne({ hsptl_name, location });
        res.status(201).json({ message: 'Hospital created successfully.' });
    } catch (error) {
    res.status(500).json({ message: 'Error creating hospital' }); 
    }
});

export default Hospital_Router;