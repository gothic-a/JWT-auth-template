import mongoose from 'mongoose'

const connectDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true,
        })

        console.log(`mongoDB connected: ${connection.connection.host}`)
    } catch(e) {
        console.error(`error ${e.message}`)
        process.exit(1)
    }
}

export default connectDB