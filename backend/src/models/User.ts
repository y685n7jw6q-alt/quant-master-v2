import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  fullName: string;
  avatar?: string;
  isActive: boolean;
  preferences: {
    theme: 'light' | 'dark';
    language: 'ar' | 'en';
    notifications: boolean;
    dailyReminder: boolean;
  };
  statistics: {
    totalQuestions: number;
    correctAnswers: number;
    totalTime: number;
    averageAccuracy: number;
    averageTime: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    fullName: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    preferences: {
      theme: {
        type: String,
        enum: ['light', 'dark'],
        default: 'light',
      },
      language: {
        type: String,
        enum: ['ar', 'en'],
        default: 'ar',
      },
      notifications: {
        type: Boolean,
        default: true,
      },
      dailyReminder: {
        type: Boolean,
        default: false,
      },
    },
    statistics: {
      totalQuestions: {
        type: Number,
        default: 0,
      },
      correctAnswers: {
        type: Number,
        default: 0,
      },
      totalTime: {
        type: Number,
        default: 0,
      },
      averageAccuracy: {
        type: Number,
        default: 0,
      },
      averageTime: {
        type: Number,
        default: 0,
      },
    },
  },
  { timestamps: true }
);

// Index للبحث السريع
userSchema.index({ email: 1 });
userSchema.index({ username: 1 });

export const User = mongoose.model<IUser>('User', userSchema);
