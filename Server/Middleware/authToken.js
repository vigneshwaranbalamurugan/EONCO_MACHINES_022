import jwt from 'jsonwebtoken';
import pkg from 'node-jose';
import dotenv from 'dotenv';
import express from 'express';

dotenv.config();
const { JWE, JWK } = pkg;
const secret_Key = process.env.JWT_SECRET;
const appp=express.Router();
const decryptToken = async (encryptedToken) => {
    const decryptionKey = await JWK.createKey('oct', 256, { alg: 'A256GCM' });
    const decryptedResult = await JWE.createDecrypt(decryptionKey)
        .decrypt(encryptedToken);
    const token = decryptedResult.plaintext.toString();
    return token;
}

const verifyToken = (token) => {
    return jwt.verify(token, secret_Key, { algorithms: ['HS256'] });
}

appp.get('/',async (req, res) => {
    try {
        const encryptedToken = req.cookies.auth_token; // Retrieve token from cookie
        if (!encryptedToken) {
            return res.status(401).json({ message: 'No token provided' });
        }

        const decryptedToken = await decryptToken(encryptedToken);
        const verifiedPayload = verifyToken(decryptedToken);

        // Attach user info to the request object
        req.user = verifiedPayload;
        next();
    } catch (error) {
        console.log(error.message);
        return res.status(401).json({ message: 'Invalid token', error: error.message });
    }
});

export default appp;