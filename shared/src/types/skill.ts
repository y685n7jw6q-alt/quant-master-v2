export interface ISkill {
  _id: string;
  code: string;
  name: string;
  nameEn: string;
  description: string;
  category: 'Basic' | 'Intermediate' | 'Advanced';
  difficulty: number;
  order: number;
  prerequisites: string[];
  dependencies: string[];
  criteria: Array<{
    _id: string;
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
    _id: string;
    errorCode: string;
    description: string;
    solution: string;
    prevalence: number;
  }>;
  resourceLinks: string[];
  createdAt: Date;
  updatedAt: Date;
}
