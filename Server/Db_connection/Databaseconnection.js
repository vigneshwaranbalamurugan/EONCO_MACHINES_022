import { MongoClient } from 'mongodb';

let db,client;

async function connectToMongoDB() {
    try {
      client = await MongoClient.connect(process.env.MONGODB_URL);
      db = client.db(process.env.Db);
      console.log(`Connected to MongoDB: ${process.env.Db}`);
    } catch (err) {
      console.error('Error connecting to MongoDB', err);
    }
}

export async function closeConnection() {
  if(client){
  await client.close();
   console.log('Closed Sucessfully');
  }
}

export async function getDb() {
    await connectToMongoDB();
    return db;
}