import { Schema, model } from 'mongoose';
import { ROLES } from '../../constants/index.js';

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: {
      type: String,
      require: true,
      default: ROLES.PARENT,
      enum: [ROLES.TEACHER, ROLES.PARENT],
    },
  },
  { timestamps: true, versionKey: false },
);

userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;

  return obj;
};

export const User = model('users', userSchema);
