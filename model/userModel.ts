import { Model, Schema, model } from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import { NextFunction } from 'express';

interface IUser {
  name: string;
  email: string;
  photo?: string;
  role: 'user' | 'guide' | 'lead-guide' | 'admin';
  password: string;
  passwordConfirm: string;
  passwordChangedAt?: Date;
  passwordResetToken?: string;
  passwordResetExpires?: Date;
  active: boolean;
}
interface IUserMethods {
  correctPassword(candidatePassword: string, userPassword: string): boolean;
}
type UserModel = Model<IUser, {}, IUserMethods>;

const UserSchema = new Schema<IUser, UserModel, IUserMethods>({
  name: {
    type: String,
    required: [true, 'Please tell us your name!'],
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  photo: String,
  role: {
    type: String,
    enum: ['user', 'guide', 'lead-guide', 'admin'],
    default: 'user',
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 6,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      validator: function (this: { password: string }, el: string) {
        return el === this.password;
      },
      message: 'Passwords do not match',
    },
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});

UserSchema.pre('save', async function (next: any) {
  if (!this.isModified('password')) return next();

  // Hash the password with a cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  // Delete the passwordConfirm field
  this.passwordConfirm = undefined!;
  next();
});

UserSchema.pre('save', function (next: any): void {
  if (!this.isModified || this.isNew) return next();
  this.passwordChangedAt = new Date(Date.now() - 1000);
  next();
});

UserSchema.method(
  'correctPassword',
  async (candidatePassword: string, userPassword: string) => {
    return await bcrypt.compare(candidatePassword, userPassword);
  },
);
const User = model<IUser, UserModel>('User', UserSchema);

export default User;
function next(): void {
  throw new Error('Function not implemented.');
}
