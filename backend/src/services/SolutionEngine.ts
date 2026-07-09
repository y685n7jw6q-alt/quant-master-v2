import { IQuestion } from '../models';

export class SolutionEngine {
  /**
   * توليد حل مفصل للسؤال
   */
  generateSolution(question: IQuestion): { steps: string[]; explanation: string } {
    const steps: string[] = [];
    let explanation = '';

    // اتبع الخطوات من الحل الأساسي
    if (question.solutions && question.solutions.length > 0) {
      const mainSolution = question.solutions[0];
      steps.push(...mainSolution.steps);
      explanation = mainSolution.explanation;
    }

    return { steps, explanation };
  }

  /**
   * إنشاء تحليل مفصل للخيارات الخاطئة
   */
  analyzeWrongChoices(question: IQuestion): Array<{ choice: string; reason: string; lesson: string }> {
    if (!question.distractorAnalysis) return [];

    return question.distractorAnalysis.map((analysis) => ({
      choice: question.options?.find((o) => o._id === analysis.optionId)?.text || '',
      reason: analysis.whyWrong,
      lesson: analysis.commonMistake,
    }));
  }

  /**
   * اختيار طريقة الحل الأنسب
   */
  selectBestMethod(
    userDifficulty: number,
    questionDifficulty: number
  ): 'standard' | 'clever' | 'estimation' {
    if (userDifficulty < questionDifficulty) {
      return 'standard'; // الطريقة القياسية أسهل
    }
    if (userDifficulty === questionDifficulty) {
      return 'clever'; // الطريقة الذكية
    }
    return 'estimation'; // التقدير للمستويات العالية
  }

  /**
   * توليد تلميح مناسب
   */
  generateHint(question: IQuestion, attemptCount: number): string {
    const hints = [
      'تأكد من قراءة السؤال بعناية',
      'حاول حل المسألة خطوة بخطوة',
      'راجع الخطوة الأولى من الحل',
      'تذكر القواعد الأساسية',
      'جرب طريقة مختلفة',
    ];

    return hints[Math.min(attemptCount, hints.length - 1)];
  }

  /**
   * توليد شرح مفصل للحل
   */
  generateDetailedExplanation(question: IQuestion, userAnswer: string | number): string {
    const correctAnswer = question.correctAnswer?.value;
    const isCorrect = userAnswer === correctAnswer;

    if (isCorrect) {
      return `إجابة صحيحة! ${question.correctAnswer?.explanation}`;
    }

    const wrongChoice = question.distractorAnalysis?.find(
      (a) => a.optionId === question.options?.find((o) => o.text === userAnswer)?._id
    );

    return `إجابة خاطئة. ${wrongChoice?.commonMistake || 'الإجابة الصحيحة هي: ' + correctAnswer}`;
  }
}

export const solutionEngine = new SolutionEngine();
