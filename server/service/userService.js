import UserModel from '../models/userModel.js'
import bcrypt from 'bcrypt'
import { v4 } from 'uuid'

import TokenService from './tokenService.js'
import MailService from './mailService.js'
import UserDto from '../dtos/userDto.js'

class UserService {
    async registration(email, password) {
        const exist = await UserModel.findOne({ email })

        if(exist) throw new Error(`User with email ${email} already exist`) 

        const hashPassword = await bcrypt.hash(password, 10)
        const activationLink = `${process.env.API_URL}/api/users/activate/${v4()}`
        const user = await UserModel.create({
            email, 
            password: hashPassword,
            activationLink
        })

        const mailService = new MailService()
        
        await mailService.sendActivationMail(email, activationLink)

        const userDto = new UserDto(user)
        const { accessToken, refreshToken } = TokenService.generateToken({...userDto})
        await TokenService.saveToken(userDto.id, refreshToken)

        return {
            accessToken,
            refreshToken,
            user: userDto
        }
    }
}

export default new UserService()