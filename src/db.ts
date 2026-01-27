import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://riyadus300_db_user:RFV9VvmTNHcmDEcJ@cluster0.1thelew.mongodb.net/myDatabase?retryWrites=true&w=majority&appName=Cluster0'

// User schema to store basic profile and Firebase UID
const userSchema = new mongoose.Schema({
  firebaseUid: { type: String, required: true, unique: true },
  email: { type: String, required: true, index: true },
  displayName: { type: String, required: true },
  phoneNumber: String,
  address: String,
  photoURL: String,
  role: { type: String, default: 'user', enum: ['user', 'admin', 'moderator'] },
  status: { type: String, default: 'active', enum: ['active', 'inactive', 'suspended', 'pending'] },
  termsAccepted: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

export const User = mongoose.models.User || mongoose.model('User', userSchema)

// Product schema
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  stock: { type: Number, default: 0 },
  imageUrl: { type: String },
  createdBy: { type: String, required: true }, // Firebase UID
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

export const Product = mongoose.models.Product || mongoose.model('Product', productSchema)

// Password Reset Token schema
const passwordResetTokenSchema = new mongoose.Schema({
  email: { type: String, required: true, index: true },
  token: { type: String, required: true, unique: true },
  expiresAt: { type: Date, required: true },
  used: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
})

export const PasswordResetToken = mongoose.models.PasswordResetToken || mongoose.model('PasswordResetToken', passwordResetTokenSchema)

export async function connectDb() {
  if (mongoose.connection.readyState === 1) return mongoose

  try {
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    })
    console.log('Connected to MongoDB')
    return mongoose
  } catch (error) {
    console.error('MongoDB connection error:', error)
    throw error
  }
}

export async function upsertUserProfile(fields: {
  firebaseUid: string
  email: string
  displayName?: string
  phoneNumber?: string
  photoURL?: string
}) {
  const { firebaseUid, email, displayName, phoneNumber, photoURL } = fields
  return User.updateOne(
    { firebaseUid },
    { firebaseUid, email, displayName: displayName || '', phoneNumber: phoneNumber || '', photoURL: photoURL || '' },
    { upsert: true }
  )
}
