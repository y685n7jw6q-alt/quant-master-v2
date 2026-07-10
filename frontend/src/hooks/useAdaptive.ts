import { useState, useCallback } from 'react';

interface UseAdaptiveReturn {
  difficulty: number;
  shouldAdjustDifficulty: (accuracy: number) => boolean;
  adjustDifficulty: (accuracy: number) => void;
  canAdvanceSkill: (accuracy: number, attempts: number) => boolean;
  getLearningRate: (attempts: Array<{ isCorrect: boolean }>) => number;
}

export const useAdaptive = (): UseAdaptiveReturn => {
  const [difficulty, setDifficulty] = useState(1);

  const shouldAdjustDifficulty = useCallback((accuracy: number): boolean => {
    return accuracy >= 80 || accuracy <= 40;
  }, []);

  const adjustDifficulty = useCallback((accuracy: number) => {
    if (accuracy >= 90) setDifficulty(5);
    else if (accuracy >= 80) setDifficulty(4);
    else if (accuracy >= 70) setDifficulty(3);
    else if (accuracy >= 50) setDifficulty(2);
    else setDifficulty(1);
  }, []);

  const canAdvanceSkill = useCallback((accuracy: number, attempts: number): boolean => {
    return accuracy >= 80 && attempts >= 3;
  }, []);

  const getLearningRate = useCallback((attempts: Array<{ isCorrect: boolean }>): number => {
    if (attempts.length < 2) return 0;
    
    const recentAttempts = attempts.slice(-10);
    const oldAttempts = attempts.slice(0, Math.min(10, attempts.length - 10));
    
    const recentAccuracy = (recentAttempts.filter(a => a.isCorrect).length / recentAttempts.length) * 100;
    const oldAccuracy = oldAttempts.length > 0
      ? (oldAttempts.filter(a => a.isCorrect).length / oldAttempts.length) * 100
      : 0;
    
    return recentAccuracy - oldAccuracy;
  }, []);

  return {
    difficulty,
    shouldAdjustDifficulty,
    adjustDifficulty,
    canAdvanceSkill,
    getLearningRate,
  };
};
