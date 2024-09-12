import dotenv from 'dotenv';
dotenv.config();

const port = Number(process.env.PORT);
const dbURI = process.env.mongoURI;
const googleClientID = process.env.GOOGLE_CLIENT_ID
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET
const githubClientID = process.env.GITHUB_CLIENT_ID
const githubClientSecret = process.env.GITHUB_CLIENT_SECRET
const roundFactors = Number(process.env.roundFactors);
const accessTokenTtl = process.env.accessTokenTtl
const refreshTokenTtl = process.env.refreshTokenTtl
const accessTokenPrivateKey = process.env.accessTokenPrivateKey
const accessTokenPublicKey = process.env.accessTokenPublicKey
const refreshTokenPrivateKey = process.env.refreshTokenPrivateKey
const refreshTokenPublicKey = process.env.refreshTokenPublicKey

export {
    port,
    dbURI,
    googleClientID,
    googleClientSecret,
    githubClientID,
    githubClientSecret,
    roundFactors,
    accessTokenTtl,
    refreshTokenTtl,
    accessTokenPrivateKey,
    accessTokenPublicKey,
    refreshTokenPrivateKey,
    refreshTokenPublicKey
}