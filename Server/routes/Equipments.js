import express from 'express';
import {getDb,closeConnection} from '../Db_connection/Databaseconnection.js';
import { ObjectId} from'mongodb'

const Machine_Router=express.Router();

Machine_Router.post('', async (req, res) => {
    
    const db=await getDb();
    try {
        const { name, treate_type, make,machine_prtocl,machine_type,hsptl_name , dateOfManufacture, purchaseDate, warrantyDate, count,Maintanence} = req.body;
        console.log(hsptl_name);
        const collection = db.collection('hospitals');
        const validBranch = await collection.findOne({ hsptl_name});
        const collections = db.collection('Machines');
        await collections.insertOne({
            Macine_name: name,
            make: make,
            treate_type:treate_type,
            machine_type:machine_prtocl,
            machine_prtocl:machine_type,
            hospitalId: validBranch._id,
            dateOfManufacture: new Date(dateOfManufacture),
            purchaseDate: new Date(purchaseDate),
            warrantyDate: new Date(warrantyDate),
            count: count,
            Preventive_Maintanence:Maintanence,
        });
        return res.status(201).json({ message: 'Machine added successfully.' });
    } catch (error) {
        console.error('Error adding machine:', error);
        return res.status(500).json({ message: 'An error occurred while adding the machine.' });
    }
});

Machine_Router.get('/treatment-types', async (req, res) => {
    const db = await getDb();
    const treatmentTypes = await db.collection('Treatment_Type').find().toArray();
    console.log(treatmentTypes);
    res.json(treatmentTypes);
});

Machine_Router.get('/machine-protocols', async (req, res) => {
    const db = await getDb();
    const machineProtocols = await db.collection('Machine_Protocol').find().toArray();
    res.json(machineProtocols);
});

Machine_Router.get('/machine-types', async (req, res) => {
    const db = await getDb();
    const machineTypes = await db.collection('Machine_type').find().toArray();
    res.json(machineTypes);
});

Machine_Router.get('/machines/:hospitalId', async (req, res) => {
    const hospitalId = req.params.hospitalId;
    const db = await getDb();
    console.log(hospitalId);
    try {
        const machines = await db.collection('Machines').find({ hospitalId: new ObjectId(hospitalId) }).toArray();       
         res.json(machines);
    } catch (error) {
        console.error('Error fetching machines:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

Machine_Router.put('/update/:machineId', async (req, res) => {
    const { machineId } = req.params;
    const { Preventive_Maintanence } = req.body;
    const db= await getDb();
    try {
        const collection = await db.collection('Machines');
        const result = await collection.updateOne(
            { _id: new ObjectId(machineId) },
            { $set: { Preventive_Maintanence } }
        );
       
        res.json({ message: 'Machine updated successfully' });
    } catch (error) {
        console.error('Error updating machine:', error);
        res.status(500).json({ error: 'Failed to update machine' });
    }
});

Machine_Router.delete('/delete/:machineId', async (req, res) => {
    const { machineId } = req.params;
    const db= await getDb();
    try {
        const collection = await db.collection('Machines'); 
        const result = await collection.deleteOne({ _id: new ObjectId(machineId) });
        res.json({ message: 'Machine deleted successfully' });
    } catch (error) {
        console.error('Error deleting machine:', error);
        res.status(500).json({ error: 'Failed to delete machine' });
    }
});

export default Machine_Router;