import express from 'express';

import { connectToMongoDB} from './Db_connection/Databaseconnection.js'
import dotenv from 'dotenv';
import path from 'path';
import core from 'cors';
import { fileURLToPath } from 'url';
import Hospital_Router from './routes/hospitals.js';
import Admin_Router from './routes/admincreate.js';
import Requirements_Router from './routes/Requirements.js';
import Login_Router from './Authentication/Login.js';
import Machine_Router from './routes/Equipments.js';

dotenv.config();

const app = express();
app.use(core());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectToMongoDB();

app.use((err, req, res, next) => {
    res.status(500).send({ message: err.message });
});

app.use('/hsptl',Hospital_Router);
app.use('/admin',Admin_Router);
app.use('/reqs',Requirements_Router);
app.use('/login',Login_Router);
app.use('/equip',Machine_Router);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// app.use(express.static(path.join(__dirname, '/Client/build')));
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '/Client/build/index.html'));
// });

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`serve at http://localhost:${port}`);
});
