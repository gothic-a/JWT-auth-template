import UserModel from '../models/userModel.js'
import bcrypt from 'bcrypt'
import { v4 } from 'uuid'

import TokenService from './tokenService.js'
import MailService from './mailService.js'
import UserDto from '../dtos/userDto.js'
import ApiError from '../exceptions/apiErrors.js'

class UserService {
    async registration(email, password, validationErrors) {
        const exist = await UserModel.findOne({ email })
        if(exist) throw ApiError.BadRequest(`User with email ${email} already exist`)

        if(!validationErrors.isEmpty()) throw ApiError.BadRequest('Validation error', validationErrors.array())

        const hashPassword = await bcrypt.hash(password, 10)
        const activationLink = v4()
        const user = await UserModel.create({
            email, 
            password: hashPassword,
            activationLink
        })

        const mailService = new MailService()
        
        await mailService.sendActivationMail(email, `${process.env.API_URL}/api/users/activate/${activationLink}`)

        const userDto = new UserDto(user)
        const { accessToken, refreshToken } = TokenService.generateToken({...userDto})
        await TokenService.saveToken(userDto.id, refreshToken)

        return {
            accessToken,
            refreshToken,
            user: userDto
        }
    }

    async activate(activationLink) {
        const user = await UserModel.findOne({activationLink})
        if(!user) throw ApiError.BadRequest('Incorrect activation link')

        user.isActivated = true
        await user.save()
    }

    async login(email, password) {
        const user = await UserModel.findOne({email})
        if(!user) throw ApiError.BadRequest('User not exist')

        const isPassEquals = await user.comparePassword(password)
        if(!isPassEquals) throw ApiError.BadRequest('Wrong password or email')
    
        const userDto = new UserDto(user)
        const { refreshToken, accessToken } = TokenService.generateToken({...userDto})
        
        await TokenService.saveToken(userDto.id, refreshToken)

        return {
            accessToken,
            refreshToken,
            user: userDto
        }
    }

    async logout(refreshToken) {
        return await TokenService.removeToken(refreshToken)
    }

    async refresh(refreshToken) {
        try {
           if(!refreshToken) throw ApiError.UnauthorizedError()

            const userData = TokenService.validateRefreshToken(refreshToken)
            const tokenFromDB = await TokenService.findToken(refreshToken)

            if(!tokenFromDB) throw ApiError.UnauthorizedError()

            const user = await UserModel.findById(userData.id)
            const userDto = new UserDto(user)

            const tokens = TokenService.generateToken({...userDto})
            await TokenService.saveToken(userDto.id, tokens.refreshToken)

            return {
                ...tokens,
                user: userDto
            } 
        } catch(e) {
            if(e.message === 'jwt expired') {
                await TokenService.removeToken(refreshToken)
                throw ApiError.TokenExpired()
            }
            throw ApiError.UnauthorizedError()
        }
        
    }

    async getAllUsers() {
        const users = await UserModel.find()
        return users
    }
}

export default new UserService()