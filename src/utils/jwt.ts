import * as config from '../config/defaults'
import jwt from 'jsonwebtoken';
import { CustomError } from './errorHandler';


export const signAccessToken = (object: Object, options?: jwt.SignOptions | undefined) => {
    try {
        const privateKey = config.accessTokenPrivateKey!
        return jwt.sign(object, privateKey, {
            ...(options && options),
            algorithm: "RS256"
        })
    } catch (err: any) {
        throw new CustomError(err.message, 500)
    }

}

export const verifyAccessToken = (token: string) => {
    try {
        const publicKey = config.accessTokenPublicKey!
        const decoded = jwt.verify(token, publicKey)
        return {
            valid: true,
            decoded
        }
    } catch (err: any) {
        return {
            valid: false,
            decoded: null
        }
    }
}

export const signRefreshToken = (object: Object, options?: jwt.SignOptions | undefined) => {
    try {
        const privateKey = config.accessTokenPrivateKey!
        return jwt.sign(object, privateKey, {
            ...(options && options),
            algorithm: "RS256"
        })
    } catch (err: any) {
        throw new CustomError(err.message, 500)
    }

}

export const verifyRefreshToken = (token: string) => {
    try {
        const publicKey = config.accessTokenPublicKey!
        const decoded = jwt.verify(token, publicKey)
        return {
            valid: true,
            decoded
        }
    } catch (err: any) {
        return {
            valid: false,
            decoded: null
        }
    }
}