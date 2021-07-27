import ApiError from '../exceptions/apiErrors.js'

const errorMiddleware = (err, req, res, next) => {
    console.log(err.message)
    if(err instanceof ApiError) {
        return res.status(err.status).json({message: err.message, errors: err.errors})
    }

    return res.status(500).json({message: 'Unexpected server error'})
}

export default errorMiddleware