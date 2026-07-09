import mongoose, { Schema, Document } from 'mongoose';

export interface IQuestion extends Document {
  skillId: mongoose.Types.ObjectId;
  criterionId: mongoose.Types.ObjectId;
  code: string;
  type: 'mcq' | 'numerical' | 'ordering';
  difficulty: number;
  timeEstimate: number;
  question: {
    arabic: string;
    english: string;
    latex: string;
  };
  options: Array<{
    _id: mongoose.Types.ObjectId;
    label: string;
    text: string;
    latex: string;
    isCorrect: boolean;
  }>;
  correctAnswer: {
    value: string | number;
    optionId: mongoose.Types.ObjectId;
    explanation: string;
  };
  solutions: Array<{
    _id: mongoose.Types.ObjectId;
    title: string;
    method: 'standard' | 'clever' | 'estimation';
    steps: string[];
    duration: number;
    explanation: string;
    latex: string;
  }>;
  distractorAnalysis: Array<{
    optionId: mongoose.Types.ObjectId;
    whyWrong: string;
    commonMistake: string;
    errorCode: string;
  }>;
  statistics: {
    totalAttempts: number;
    correctAttempts: number;
    averageTime: number;
    accuracy: number;
    difficulty_actual: number;
  };
  tags: string[];
  source: string;
  reviewer: mongoose.Types.ObjectId;
  status: 'draft' | 'review' | 'approved' | 'archived';
  version: number;
  createdAt: Date;
  updatedAt: Date;
  lastUsed: Date;
}

const questionSchema = new Schema<IQuestion>(
  {
    skillId: {
      type: Schema.Types.ObjectId,
      ref: 'Skill',
      required: true,
    },
    criterionId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    code: {
      type: String,
      required: true,
      unique: true,
    },
    type: {
      type: String,
      enum: ['mcq', 'numerical', 'ordering'],
      default: 'mcq',
    },
    difficulty: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },
    timeEstimate: Number,
    question: {
      arabic: String,
      english: String,
      latex: String,
    },
    options: [
      {
        label: String,
        text: String,
        latex: String,
        isCorrect: Boolean,
      },
    ],
    correctAnswer: {
      value: Schema.Types.Mixed,
      optionId: Schema.Types.ObjectId,
      explanation: String,
    },
    solutions: [
      {
        title: String,
        method: {
          type: String,
          enum: ['standard', 'clever', 'estimation'],
        },
        steps: [String],
        duration: Number,
        explanation: String,
        latex: String,
      },
    ],
    distractorAnalysis: [
      {
        optionId: Schema.Types.ObjectId,
        whyWrong: String,
        commonMistake: String,
        errorCode: String,
      },
    ],
    statistics: {
      totalAttempts: {
        type: Number,
        default: 0,
      },
      correctAttempts: {
        type: Number,
        default: 0,
      },
      averageTime: Number,
      accuracy: Number,
      difficulty_actual: Number,
    },
    tags: [String],
    source: String,
    reviewer: Schema.Types.ObjectId,
    status: {
      type: String,
      enum: ['draft', 'review', 'approved', 'archived'],
      default: 'draft',
    },
    version: {
      type: Number,
      default: 1,
    },
    lastUsed: Date,
  },
  { timestamps: true }
);

questionSchema.index({ skillId: 1 });
questionSchema.index({ code: 1 });
questionSchema.index({ difficulty: 1 });
questionSchema.index({ status: 1 });

export const Question = mongoose.model<IQuestion>('Question', questionSchema);
