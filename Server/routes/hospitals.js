import express from 'express';
import { closeConnection, getDb} from '../Databaseconnection.js';
import { ObjectId } from 'mongodb';
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
    }finally{
        await closeConnection();
    }
});

Hospital_Router.get('/name/:id',async(req,res)=>{
    const id = req.params.id;
    console.log(id);
    const db = await getDb();
    try {
        const hospital = await db.collection('hospitals');
        const hosp=await hospital.findOne({ _id: new ObjectId(id) });     
        console.log(hosp);  
         res.json({hosp});
    } catch (error) {
        console.error('Error fetching machines:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


export default Hospital_Router;