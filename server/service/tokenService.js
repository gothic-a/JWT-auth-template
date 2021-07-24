import jwt from 'jsonwebtoken'
import tokenModel from '../models/tokenModel.js'
import TokenModel from '../models/tokenModel.js'

class TokenService {
    generateToken(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: '30m'})
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: '30d'})

        return {
            accessToken,
            refreshToken
        }
    }

    async saveToken(userId, refreshToken) {
        try {
            const tokenExist = await TokenModel.findOne({user: userId})
            if(tokenExist) {
                token.refreshToken = refreshToken
                return tokenData.save()
            }

            const token = await tokenModel.create({user: userId, refreshToken})
            return token
        } catch(e) {
            throw new Error(e.message)
        }
        
    }
}

export default new TokenService()