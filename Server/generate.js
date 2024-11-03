import pkg from 'node-jose';

const { JWK } = pkg;
// Generate a static key and output it to the console
const generateStaticKey = async () => {
    const key = await JWK.createKey('oct', 256, { alg: 'A256GCM', use: 'enc' });
    console.log(key.toJSON(true)); // Save this key's output securely
};

generateStaticKey();
