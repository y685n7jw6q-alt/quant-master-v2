import mongoose, { Schema, Document } from 'mongoose';

export interface IUserProgress extends Document {
  userId: mongoose.Types.ObjectId;
  skillId: mongoose.Types.ObjectId;
  criterionId: mongoose.Types.ObjectId;
  totalAttempts: number;
  correctAttempts: number;
  accuracy: number;
  attempts: Array<{
    questionId: mongoose.Types.ObjectId;
    userAnswer: string | number;
    isCorrect: boolean;
    timeSpent: number;
    timestamp: Date;
    errorCode: string;
  }>;
  mastery: {
    status: 'notStarted' | 'learning' | 'proficient' | 'mastered';
    percentage: number;
    lastReviewDate: Date;
    masterDate: Date;
  };
  confidence: number;
  learningRate: number;
  repeatedErrors: Array<{
    errorCode: string;
    count: number;
    lastOccurrence: Date;
  }>;
  createdAt: Date;
  updatedAt: Date;
  lastAttemptDate: Date;
}

const userProgressSchema = new Schema<IUserProgress>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    skillId: {
      type: Schema.Types.ObjectId,
      ref: 'Skill',
      required: true,
    },
    criterionId: Schema.Types.ObjectId,
    totalAttempts: {
      type: Number,
      default: 0,
    },
    correctAttempts: {
      type: Number,
      default: 0,
    },
    accuracy: {
      type: Number,
      default: 0,
    },
    attempts: [
      {
        questionId: Schema.Types.ObjectId,
        userAnswer: Schema.Types.Mixed,
        isCorrect: Boolean,
        timeSpent: Number,
        timestamp: Date,
        errorCode: String,
      },
    ],
    mastery: {
      status: {
        type: String,
        enum: ['notStarted', 'learning', 'proficient', 'mastered'],
        default: 'notStarted',
      },
      percentage: {
        type: Number,
        default: 0,
      },
      lastReviewDate: Date,
      masterDate: Date,
    },
    confidence: {
      type: Number,
      default: 0,
    },
    learningRate: Number,
    repeatedErrors: [
      {
        errorCode: String,
        count: Number,
        lastOccurrence: Date,
      },
    ],
    lastAttemptDate: Date,
  },
  { timestamps: true }
);

userProgressSchema.index({ userId: 1, skillId: 1 }, { unique: true });
userProgressSchema.index({ userId: 1 });

export const UserProgress = mongoose.model<IUserProgress>('UserProgress', userProgressSchema);
