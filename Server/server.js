import express from 'express';

import { getDb } from './Databaseconnection.js';
import dotenv from 'dotenv';
import path from 'path';
import core from 'cors';
import Hospital_Router from './routes/hospitals.js';
import Admin_Router from './routes/admincreate.js';

dotenv.config();

const app = express();
app.use(core());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



const db = getDb();
if (!db) {
    console.log('Database connection not ready');
}


app.use((err, req, res, next) => {
    res.status(500).send({ message: err.message });
});

app.use('/hsptl',Hospital_Router);
app.use('/admin',Admin_Router);

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`serve at http://localhost:${port}`);
});
