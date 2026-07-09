import mongoose, { Schema, Document } from 'mongoose';

export interface ISkill extends Document {
  code: string;
  name: string;
  nameEn: string;
  description: string;
  category: 'Basic' | 'Intermediate' | 'Advanced';
  difficulty: number;
  order: number;
  prerequisites: mongoose.Types.ObjectId[];
  dependencies: mongoose.Types.ObjectId[];
  criteria: Array<{
    _id: mongoose.Types.ObjectId;
    code: string;
    name: string;
    objectives: string[];
    weight: number;
  }>;
  masteryThreshold: number;
  mastery: {
    minCorrectAnswers: number;
    minAttempts: number;
    minAccuracy: number;
    maxTimePerQuestion: number;
  };
  commonErrors: Array<{
    _id: mongoose.Types.ObjectId;
    errorCode: string;
    description: string;
    solution: string;
    prevalence: number;
  }>;
  resourceLinks: string[];
  createdAt: Date;
  updatedAt: Date;
}

const skillSchema = new Schema<ISkill>(
  {
    code: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    nameEn: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    category: {
      type: String,
      enum: ['Basic', 'Intermediate', 'Advanced'],
      default: 'Basic',
    },
    difficulty: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },
    order: {
      type: Number,
      default: 0,
    },
    prerequisites: [{
      type: Schema.Types.ObjectId,
      ref: 'Skill',
    }],
    dependencies: [{
      type: Schema.Types.ObjectId,
      ref: 'Skill',
    }],
    criteria: [
      {
        code: String,
        name: String,
        objectives: [String],
        weight: Number,
      },
    ],
    masteryThreshold: {
      type: Number,
      default: 80,
    },
    mastery: {
      minCorrectAnswers: {
        type: Number,
        default: 5,
      },
      minAttempts: {
        type: Number,
        default: 3,
      },
      minAccuracy: {
        type: Number,
        default: 80,
      },
      maxTimePerQuestion: {
        type: Number,
        default: 300,
      },
    },
    commonErrors: [
      {
        errorCode: String,
        description: String,
        solution: String,
        prevalence: Number,
      },
    ],
    resourceLinks: [String],
  },
  { timestamps: true }
);

skillSchema.index({ code: 1 });
skillSchema.index({ category: 1 });

export const Skill = mongoose.model<ISkill>('Skill', skillSchema);
