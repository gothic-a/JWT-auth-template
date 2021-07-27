class ApiError extends Error {
    constructor(status, message, errors = []) {
        super(message)
        this.status = status
        this.errors = errors
    }

    static UnauthorizedError() {
        return new ApiError(401, 'User not authorized')
    }

    static TokenExpired() {
        return new ApiError(419, 'Token Expired')
    }

    static BadRequest(message, errors = []) {
        return new ApiError(400, message, errors)
    }
}

export default ApiError