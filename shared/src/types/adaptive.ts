export interface IAdaptiveSession {
  userId: string;
  skillId: string;
  difficulty: number;
  totalAttempts: number;
  correctAttempts: number;
  accuracy: number;
  confidence: number;
  learningRate: number;
  lastUpdated: Date;
}

export interface IMasteryStatus {
  status: 'notStarted' | 'learning' | 'proficient' | 'mastered';
  percentage: number;
  lastReviewDate: Date;
  masterDate?: Date;
}
