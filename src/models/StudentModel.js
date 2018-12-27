import mongoose from 'mongoose';

const { Schema } = mongoose;

const StudentSchema = new Schema({
  studentId: { required: true, type: String },
  studentName: { required: true, type: String },
  password: { required: true, type: String },
  createdDate: { type: String, default: Date },
});

export const StudentModel = mongoose.model('student', StudentSchema);
