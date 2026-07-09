import mongoose, { Schema, Document } from 'mongoose';

export interface IErrorLog extends Document {
  userId: mongoose.Types.ObjectId;
  skillId: mongoose.Types.ObjectId;
  questionId: mongoose.Types.ObjectId;
  errorCode: string;
  errorType: 'conceptual' | 'calculation' | 'careless';
  description: string;
  userAnswer: string | number;
  correctAnswer: string | number;
  diagnosis: {
    root: string;
    category: string;
    severity: 'critical' | 'major' | 'minor';
  };
  remediation: {
    suggestedSkill: mongoose.Types.ObjectId;
    therapeuticQuestion: mongoose.Types.ObjectId;
  };
  timestamp: Date;
  resolved: boolean;
  resolution: {
    date: Date;
    method: string;
  };
}

const errorLogSchema = new Schema<IErrorLog>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    skillId: {
      type: Schema.Types.ObjectId,
      ref: 'Skill',
    },
    questionId: {
      type: Schema.Types.ObjectId,
      ref: 'Question',
    },
    errorCode: String,
    errorType: {
      type: String,
      enum: ['conceptual', 'calculation', 'careless'],
    },
    description: String,
    userAnswer: Schema.Types.Mixed,
    correctAnswer: Schema.Types.Mixed,
    diagnosis: {
      root: String,
      category: String,
      severity: {
        type: String,
        enum: ['critical', 'major', 'minor'],
      },
    },
    remediation: {
      suggestedSkill: Schema.Types.ObjectId,
      therapeuticQuestion: Schema.Types.ObjectId,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
    resolved: {
      type: Boolean,
      default: false,
    },
    resolution: {
      date: Date,
      method: String,
    },
  },
  { timestamps: false }
);

errorLogSchema.index({ userId: 1 });
errorLogSchema.index({ errorCode: 1 });
errorLogSchema.index({ timestamp: -1 });

export const ErrorLog = mongoose.model<IErrorLog>('ErrorLog', errorLogSchema);
