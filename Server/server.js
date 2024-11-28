import express from 'express';
import cookieParser from 'cookie-parser'; // Use import instead of require
import { connectToMongoDB} from './Db_connection/Databaseconnection.js'
import pkg from 'node-jose';
import dotenv from 'dotenv';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';
import Hospital_Router from './routes/hospitals.js';
import Admin_Router from './routes/admincreate.js';
import Requirements_Router from './routes/Requirements.js';
import Login_Router from './Authentication/Login.js';
import Machine_Router from './routes/Equipments.js';
import authMiddleware from './Middleware/authToken.js'; 
import appp from './Middleware/authToken.js';

dotenv.config();
const { JWE, JWK } = pkg;

const encryptionKey = await JWK.createKey('oct', 256, { alg: 'A256GCM' });

const app = express();
app.use(cors({
  origin: 'http://localhost:3000', // Your frontend URL
  credentials: true // Allow sending cookies
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// app.use(authMiddleware);

connectToMongoDB();

app.use((err, req, res, next) => {
    res.status(500).send({ message: err.message });
});

app.use('/hsptl',Hospital_Router);
app.use('/admin',Admin_Router);
app.use('/reqs',Requirements_Router);
app.use('/login',Login_Router);
app.use('/equip',Machine_Router);
app.use('/protectd',appp);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, '/Client/build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/Client/build/index.html'));
});

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`serve at http://localhost:${port}`);
});


export default encryptionKey;