import jwt from 'jsonwebtoken'
import tokenModel from '../models/tokenModel.js'
import TokenModel from '../models/tokenModel.js'

class TokenService {
    generateToken(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: '60s'})
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: '30d'})

        return {
            accessToken,
            refreshToken
        }
    }

    validateAccessToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
            
            return userData
        } catch(e) {
            throw e
        }
    }

    validateRefreshToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET)
            return userData
        } catch(e) {
            throw e
        }
    }

    async saveToken(userId, refreshToken) {
        try {
            const tokenExist = await TokenModel.findOne({user: userId})
            if(tokenExist) {
                tokenExist.refreshToken = refreshToken
                return tokenExist.save()
            }

            const token = await tokenModel.create({user: userId, refreshToken})
            return token
        } catch(e) {
            throw new Error(e.message)
        }
    }

    async removeToken(refreshToken) {
        return await TokenModel.deleteOne({refreshToken})
    }

    async findToken(refreshToken) {
        return await TokenModel.findOne({refreshToken})
    }
}

export default new TokenService()