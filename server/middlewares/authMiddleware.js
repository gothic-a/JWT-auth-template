import ApiError from '../exceptions/apiErrors.js'
import TokenService from '../service/tokenService.js'

const protect = (req, res, next) => {
    try {
        const authorizationHeader = req.headers.authorization        
        const accessToken = authorizationHeader.split(' ')[1]

        if(!accessToken || !authorizationHeader) throw ApiError.UnauthorizedError()

        const userData = TokenService.validateAccessToken(accessToken)
        if(!userData) throw ApiError.UnauthorizedError()

        req.user = userData

        next()
    } catch(e) {
        return next(ApiError.UnauthorizedError())
    }
}

export default protect