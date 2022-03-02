import mongoose, { ConnectOptions } from 'mongoose'

type ConnType = {
  isConnected: boolean | number
}

const conn: ConnType = {
  isConnected: false
}

const mongodbURI = process.env.MONGODB_URI.toString()

const connectDB = async (): Promise<void> => {
  if (conn.isConnected) return null
  const db = await mongoose.connect(mongodbURI, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  } as ConnectOptions)
  conn.isConnected = db.connections[0].readyState
}

mongoose.connection.on('connected', () => {
  console.log('MongoDB connected')
})

mongoose.connection.on('error', error => {
  console.log(error)
})

export default connectDB
