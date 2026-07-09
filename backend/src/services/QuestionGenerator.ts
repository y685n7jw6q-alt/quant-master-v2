import { IQuestion } from '../models';

export class QuestionGenerator {
  /**
   * توليد سؤال جديد بناءً على المعاملات
   */
  generateQuestion(
    skillId: string,
    difficulty: number,
    questionType: 'mcq' | 'numerical' | 'ordering'
  ): Partial<IQuestion> {
    const code = `Q-${skillId}-${Date.now()}`;
    
    return {
      code,
      skillId: skillId as any,
      type: questionType,
      difficulty,
      status: 'draft',
      version: 1,
      statistics: {
        totalAttempts: 0,
        correctAttempts: 0,
        averageTime: 0,
        accuracy: 0,
        difficulty_actual: 0,
      },
    };
  }

  /**
   * التحقق من صحة السؤال
   */
  validateQuestion(question: Partial<IQuestion>): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!question.question?.arabic) errors.push('النص العربي مطلوب');
    if (!question.question?.latex) errors.push('صيغة LaTeX مطلوبة');
    if (!question.options || question.options.length < 2) errors.push('يجب توفير خيارين على الأقل');
    if (!question.correctAnswer?.value) errors.push('الإجابة الصحيحة مطلوبة');
    if (!question.solutions || question.solutions.length === 0) errors.push('يجب توفير حل واحد على الأقل');

    return {
      valid: errors.length === 0,
      errors,
    };
  }

  /**
   * توليد مجموعة أسئلة لاختبار
   */
  generateQuizQuestions(
    skillIds: string[],
    questionCount: number,
    difficulty: number
  ): Partial<IQuestion>[] {
    const questions: Partial<IQuestion>[] = [];
    const types: ('mcq' | 'numerical' | 'ordering')[] = ['mcq', 'numerical', 'ordering'];

    for (let i = 0; i < questionCount; i++) {
      const skillId = skillIds[i % skillIds.length];
      const questionType = types[i % types.length];
      questions.push(this.generateQuestion(skillId, difficulty, questionType));
    }

    return questions;
  }

  /**
   * تعديل صعوبة السؤال بناءً على الإحصائيات
   */
  adjustDifficulty(question: Partial<IQuestion>): Partial<IQuestion> {
    if (!question.statistics) return question;

    const { accuracy, difficulty } = question.statistics;

    // إذا كان الجميع يجيبون بشكل صحيح، زد الصعوبة
    if (accuracy > 85 && difficulty! < 5) {
      question.difficulty = difficulty! + 1;
    }
    // إذا كان معظم الناس يخطئون، قلل الصعوبة
    else if (accuracy < 40 && difficulty! > 1) {
      question.difficulty = difficulty! - 1;
    }

    return question;
  }
}

export const questionGenerator = new QuestionGenerator();
