import jwt from 'jsonwebtoken';
import pkg from 'node-jose';
import dotenv from 'dotenv';
import encryptionKey from '../server.js';

dotenv.config();
const { JWE, JWK } = pkg;

const secret_Key = process.env.JWT_SECRET;

const generateToken = (user) => {
    return jwt.sign(
        {
            _id: user._id,
            email: user.email,
            hospital_id: user.hospital,
            userRoll: user.Roll
        },
        secret_Key,
        { algorithm: 'HS256', expiresIn: '1h' }
    );
}

export const encryptToken = async (user) => {
    const token = generateToken(user);
    const encryptedToken = await JWE.createEncrypt(
        { format: 'compact' }, 
        encryptionKey)
        .update(token)
        .final();
    return encryptedToken;
}