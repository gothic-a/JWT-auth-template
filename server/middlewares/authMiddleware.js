import ApiError from '../exceptions/apiErrors.js'
import TokenService from '../service/tokenService.js'

const protect = (req, res, next) => {
    try {
        const authorizationHeader = req.headers.authorization   
        
        console.log(authorizationHeader)
        const accessToken = authorizationHeader.split(' ')[1]

        if(!accessToken || !authorizationHeader) throw ApiError.UnauthorizedError()

        const userData = TokenService.validateAccessToken(accessToken)
        req.user = userData

        next()
    } catch(e) {
        if(e.message === 'jwt expired') {
            next(ApiError.TokenExpired())
        } else {
            next(ApiError.UnauthorizedError())
        }
    }
}

export default protect