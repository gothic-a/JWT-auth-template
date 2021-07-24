import UserService from '../service/userService.js'

class UserController {
    async registration(req, res, next) {
        try {
            const { email, password } = req.body
            const { user, accessToken, refreshToken } = await UserService.registration(email, password)

            res.cookie('refreshToken', refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json({user, accessToken})
        } catch(e) {
            console.log(`Error ${e.message}`)
        }
    }

    async login(req, res, next) {

        try {

        } catch(e) {

        }

    }

    async logout(req, res, next) {

        try {

        } catch(e) {

        }

    }

    async activate(req, res, next) {

        try {

        } catch(e) {

        }

    }

    async refresh(req, res, next) {

        try {

        } catch(e) {

        }

    }

    async getUsers(req, res, next) {

        try {
            res.json(['hello bitch'])
        } catch(e) {

        }

    }
}

export default new UserController()