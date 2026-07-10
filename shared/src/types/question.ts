export interface IQuestion {
  _id: string;
  skillId: string;
  criterionId: string;
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
    _id: string;
    label: string;
    text: string;
    latex: string;
    isCorrect: boolean;
  }>;
  correctAnswer: {
    value: string | number;
    optionId: string;
    explanation: string;
  };
  solutions: Array<{
    _id: string;
    title: string;
    method: 'standard' | 'clever' | 'estimation';
    steps: string[];
    duration: number;
    explanation: string;
    latex: string;
  }>;
  distractorAnalysis: Array<{
    optionId: string;
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
  reviewer: string;
  status: 'draft' | 'review' | 'approved' | 'archived';
  version: number;
  createdAt: Date;
  updatedAt: Date;
  lastUsed: Date;
}
