import { create } from 'zustand';

interface Question {
  _id: string;
  question: string;
  options: Array<{ _id: string; text: string }>;
}

interface QuizStore {
  currentQuestion: Question | null;
  selectedAnswer: string | null;
  score: number;
  totalQuestions: number;
  setCurrentQuestion: (question: Question) => void;
  setSelectedAnswer: (answer: string) => void;
  addScore: (points: number) => void;
  resetQuiz: () => void;
}

export const useQuizStore = create<QuizStore>((set) => ({
  currentQuestion: null,
  selectedAnswer: null,
  score: 0,
  totalQuestions: 0,

  setCurrentQuestion: (question: Question) =>
    set({ currentQuestion: question }),

  setSelectedAnswer: (answer: string) =>
    set({ selectedAnswer: answer }),

  addScore: (points: number) =>
    set((state) => ({ score: state.score + points })),

  resetQuiz: () =>
    set({ currentQuestion: null, selectedAnswer: null, score: 0, totalQuestions: 0 }),
}));
