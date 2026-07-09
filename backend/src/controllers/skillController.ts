import { Request, Response } from 'express';
import { Skill } from '../models';

export class SkillController {
  /**
   * الحصول على جميع المهارات
   */
  async getAllSkills(req: Request, res: Response): Promise<void> {
    try {
      const { category, page = 1, limit = 20 } = req.query;

      const query: any = {};
      if (category) query.category = category;

      const skip = ((Number(page) - 1) * Number(limit)) || 0;
      const skills = await Skill.find(query).skip(skip).limit(Number(limit));
      const total = await Skill.countDocuments(query);

      res.json({
        success: true,
        skills,
        pagination: {
          page: Number(page),
          limit: Number(limit),
          total,
          pages: Math.ceil(total / Number(limit)),
        },
      });
    } catch (error) {
      res.status(500).json({ success: false, message: 'خطأ في جلب المهارات', error });
    }
  }

  /**
   * الحصول على مهارة محددة
   */
  async getSkillById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const skill = await Skill.findById(id).populate('prerequisites').populate('dependencies');

      if (!skill) {
        res.status(404).json({ success: false, message: 'المهارة غير موجودة' });
        return;
      }

      res.json({ success: true, skill });
    } catch (error) {
      res.status(500).json({ success: false, message: 'خطأ في جلب المهارة', error });
    }
  }

  /**
   * إنشاء مهارة جديدة
   */
  async createSkill(req: Request, res: Response): Promise<void> {
    try {
      const skillData = req.body;
      const skill = new Skill(skillData);
      await skill.save();

      res.status(201).json({ success: true, skill });
    } catch (error) {
      res.status(500).json({ success: false, message: 'خطأ في إنشاء المهارة', error });
    }
  }

  /**
   * تحديث مهارة
   */
  async updateSkill(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const skillData = req.body;

      const skill = await Skill.findByIdAndUpdate(id, skillData, { new: true });

      if (!skill) {
        res.status(404).json({ success: false, message: 'المهارة غير موجودة' });
        return;
      }

      res.json({ success: true, skill });
    } catch (error) {
      res.status(500).json({ success: false, message: 'خطأ في تحديث المهارة', error });
    }
  }
}

export const skillController = new SkillController();
