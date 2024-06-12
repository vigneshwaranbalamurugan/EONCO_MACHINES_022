import { MongoClient } from 'mongodb';

let db;

async function connectToMongoDB() {
    try {
      const client = await MongoClient.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      db = client.db(process.env.Db);
      console.log(`Connected to MongoDB: ${process.env.Db}`);
    } catch (err) {
      console.error('Error connecting to MongoDB', err);
    }
}


export async function getDb() {
    await connectToMongoDB();
    return db;
}