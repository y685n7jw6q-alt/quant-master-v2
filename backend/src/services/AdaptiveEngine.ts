import { IUserProgress, IQuestion } from '../models';

export class AdaptiveEngine {
  /**
   * تحديد مستوى الصعوبة التالي بناءً على أداء المستخدم
   */
  selectDifficulty(accuracy: number): number {
    if (accuracy >= 90) return 5;
    if (accuracy >= 80) return 4;
    if (accuracy >= 70) return 3;
    if (accuracy >= 50) return 2;
    return 1;
  }

  /**
   * التحقق من إمكانية الانتقال للمهارة التالية
   */
  canAdvanceSkill(accuracy: number, attempts: number, minAccuracy: number = 80, minAttempts: number = 3): boolean {
    return accuracy >= minAccuracy && attempts >= minAttempts;
  }

  /**
   * حساب مستوى الإتقان
   */
  calculateMasteryLevel(progress: Partial<IUserProgress>): number {
    if (!progress.totalAttempts || progress.totalAttempts === 0) return 0;
    const accuracy = ((progress.correctAttempts || 0) / progress.totalAttempts) * 100;
    return Math.min(Math.round(accuracy), 100);
  }

  /**
   * تحديد الأسئلة الموصى بها بناءً على الأخطاء المتكررة
   */
  recommendSkillsByErrors(errors: Array<{ errorCode: string; count: number }>): string[] {
    return errors
      .filter(e => e.count >= 2)
      .map(e => e.errorCode)
      .slice(0, 3);
  }

  /**
   * حساب معدل التعلم
   */
  calculateLearningRate(attempts: Array<{ timestamp: Date; isCorrect: boolean }>): number {
    if (attempts.length < 2) return 0;
    
    const recentAttempts = attempts.slice(-10);
    const oldAttempts = attempts.slice(0, Math.min(10, attempts.length - 10));
    
    const recentAccuracy = (recentAttempts.filter(a => a.isCorrect).length / recentAttempts.length) * 100;
    const oldAccuracy = oldAttempts.length > 0 
      ? (oldAttempts.filter(a => a.isCorrect).length / oldAttempts.length) * 100 
      : 0;
    
    return recentAccuracy - oldAccuracy;
  }

  /**
   * تحديد ثقة المستخدم بناءً على أدائه
   */
  calculateConfidence(accuracy: number, consistency: number): number {
    return (accuracy * 0.7 + consistency * 0.3);
  }
}

export const adaptiveEngine = new AdaptiveEngine();
