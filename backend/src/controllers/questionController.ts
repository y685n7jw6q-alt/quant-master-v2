import { Request, Response } from 'express';
import { Question } from '../models';

export class QuestionController {
  /**
   * الحصول على أسئلة
   */
  async getQuestions(req: Request, res: Response): Promise<void> {
    try {
      const { skillId, difficulty, page = 1, limit = 10 } = req.query;

      const query: any = {};
      if (skillId) query.skillId = skillId;
      if (difficulty) query.difficulty = difficulty;

      const skip = ((Number(page) - 1) * Number(limit)) || 0;
      const questions = await Question.find(query).skip(skip).limit(Number(limit));
      const total = await Question.countDocuments(query);

      res.json({
        success: true,
        questions,
        pagination: {
          page: Number(page),
          limit: Number(limit),
          total,
        },
      });
    } catch (error) {
      res.status(500).json({ success: false, message: 'خطأ في جلب الأسئلة', error });
    }
  }

  /**
   * الحصول على سؤال محدد
   */
  async getQuestionById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const question = await Question.findById(id);

      if (!question) {
        res.status(404).json({ success: false, message: 'السؤال غير موجود' });
        return;
      }

      res.json({ success: true, question });
    } catch (error) {
      res.status(500).json({ success: false, message: 'خطأ في جلب السؤال', error });
    }
  }

  /**
   * إنشاء سؤال جديد
   */
  async createQuestion(req: Request, res: Response): Promise<void> {
    try {
      const questionData = req.body;
      const question = new Question(questionData);
      await question.save();

      res.status(201).json({ success: true, question });
    } catch (error) {
      res.status(500).json({ success: false, message: 'خطأ في إنشاء السؤال', error });
    }
  }

  /**
   * إرسال إجابة على السؤال
   */
  async submitAnswer(req: Request, res: Response): Promise<void> {
    try {
      const { questionId, selectedOption, timeSpent } = req.body;
      const userId = (req as any).userId;

      const question = await Question.findById(questionId);
      if (!question) {
        res.status(404).json({ success: false, message: 'السؤال غير موجود' });
        return;
      }

      const isCorrect = question.correctAnswer?.optionId?.toString() === selectedOption;

      // تحديث إحصائيات السؤال
      question.statistics.totalAttempts += 1;
      if (isCorrect) {
        question.statistics.correctAttempts += 1;
      }
      question.statistics.accuracy = (question.statistics.correctAttempts / question.statistics.totalAttempts) * 100;
      await question.save();

      res.json({
        success: true,
        result: {
          questionId,
          isCorrect,
          correctAnswer: question.correctAnswer?.value,
          userAnswer: question.options?.find(o => o._id?.toString() === selectedOption)?.text,
          feedback: isCorrect ? 'إجابة صحيحة!' : 'إجابة خاطئة',
          timeSpent,
        },
      });
    } catch (error) {
      res.status(500).json({ success: false, message: 'خطأ في إرسال الإجابة', error });
    }
  }
}

export const questionController = new QuestionController();
