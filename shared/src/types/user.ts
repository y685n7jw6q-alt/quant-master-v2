export interface IUser {
  _id: string;
  username: string;
  email: string;
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
