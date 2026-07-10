import { useState, useCallback } from 'react';

interface UseQuizReturn {
  currentQuestion: any;
  selectedOption: string;
  setSelectedOption: (option: string) => void;
  submitAnswer: () => Promise<void>;
  nextQuestion: () => Promise<void>;
  isLoading: boolean;
  result: any;
}

export const useQuiz = (): UseQuizReturn => {
  const [currentQuestion, setCurrentQuestion] = useState<any>(null);
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const fetchNextQuestion = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/questions/next', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await response.json();
      if (data.success) {
        setCurrentQuestion(data.question);
        setSelectedOption('');
        setResult(null);
      }
    } catch (error) {
      console.error('Error fetching question:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const submitAnswer = useCallback(async () => {
    if (!selectedOption) return;

    try {
      const response = await fetch('/api/questions/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          questionId: currentQuestion._id,
          selectedOption,
          timeSpent: 60,
        }),
      });
      const data = await response.json();
      if (data.success) {
        setResult(data.result);
      }
    } catch (error) {
      console.error('Error submitting answer:', error);
    }
  }, [currentQuestion, selectedOption]);

  return {
    currentQuestion,
    selectedOption,
    setSelectedOption,
    submitAnswer,
    nextQuestion: fetchNextQuestion,
    isLoading,
    result,
  };
};
