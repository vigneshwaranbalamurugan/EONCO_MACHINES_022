import express from 'express';
import { getDb,closeConnection} from '../Databaseconnection.js';

const Requirements_Router = express.Router();

async function insert(res,collectio,data_type,data,type){
    const db=await getDb();
    const collection = db.collection(collectio);
    try{
        const existingType = await collection.findOne({[data_type]:data});
        if(existingType){
            return res.status(409).json({ message: `${type} already exists.` });
        }
        await collection.insertOne({[data_type]:data});
        return res.status(201).json({ message: `${type} Created Sucessfully.` });

    }catch(error){
        res.status(500).json({ message: `Error creating ${type}`}); 
    }finally{
        await closeConnection();
      }
};

Requirements_Router.post('/trtmnt_type',async(req,res)=>{
    const {trtmnt_type}=req.body;
    insert(res,'Treatment_Type','Type',trtmnt_type,'Treatment')
    await closeConnection();
});

Requirements_Router.post('/machine_type',async(req,res)=>{
    const {machine_type}=req.body;
    insert(res,'Machine_type','Type',machine_type,'Machine')
    await closeConnection();
});

Requirements_Router.post('/machine_prtocl',async(req,res)=>{
    const {protocol}=req.body;
    insert(res,'Machine_Protocol','Prtotocol',protocol,'Protocol')
    await closeConnection();
});


export default Requirements_Router;