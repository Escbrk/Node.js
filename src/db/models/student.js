import { Schema, model } from 'mongoose';

const studentSchema = new Schema(
  {
    name: { type: String, required: true },
    age: { type: Number, require: true },
    gender: { type: String, require: true, enum: ['male', 'female'] },
    avgMark: { type: Number, require: true, min: 1, max: 12 },
    onDuty: { type: Boolean, default: false },
  },
  { timestamps: true, versionKey: false },
);

export const Student = model('student', studentSchema);
