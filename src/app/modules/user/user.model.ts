import { model, Schema } from 'mongoose';
import IUser from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';

const userSchema = new Schema<IUser>(
  {
    id: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    needsPasswordChange: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
      enum: ['admin', 'faculty', 'student'],
      required: true,
    },
    status: {
      type: String,
      enum: ['in-progress', 'blocked'],
      required: true,
      default: 'in-progress',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

// pre save middleware/hook
userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    Number(config?.bcrypt_salt_rounds),
  );
  // console.log(`${this} pre hook: we will save the student`);
  next();
});

// post save middleware/hook
//   userSchema.post('save', function (doc, next) {
//     doc.password = '';
//     // console.log(`${this} post hook: we saved the student`);
//     next();
//   });

const User = model<IUser>('user', userSchema);
export default User;
