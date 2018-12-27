import mongoose from 'mongoose';

const { Schema } = mongoose;

const UserSchema = new Schema({
  userId: { required: true, type: String },
  userName: { required: true, type: String },
  password: { required: true, type: String },
  createdDate: { type: String, default: Date },
  role: { type: String, required: true },
});

export const UserModel = mongoose.model('user', UserSchema);
