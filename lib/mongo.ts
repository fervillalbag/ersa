import mongoose from 'mongoose'

const mongooConnection = {
  isConnected: 0
}

export const connected = async (): Promise<void> => {
  if (mongooConnection.isConnected) {
    console.log('ya estabamos conectados')
    return
  }

  if (mongoose.connections.length > 0) {
    mongooConnection.isConnected = mongoose.connections[0].readyState

    if (mongooConnection.isConnected === 1) {
      console.log('usando conexión anterior')
      return
    }

    await mongoose.disconnect()
  }

  mongoose.connect(
    process.env.MONGO_URI as string,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    } as mongoose.ConnectOptions
  )
  mongooConnection.isConnected = 1
  console.log('conectado a mongodb')
}

export const disconnect = async (): Promise<void> => {
  if (process.env.NODE_ENV === 'development') return
  if (mongooConnection.isConnected === 0) return

  await mongoose.disconnect()
  console.log('estamos desconectados')
}
