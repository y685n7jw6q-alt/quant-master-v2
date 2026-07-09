import { Request, Response } from 'express';
import { User } from '../models';
import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';
import { env } from '../config/env';

export class AuthController {
  /**
   * تسجيل مستخدم جديد
   */
  async register(req: Request, res: Response): Promise<void> {
    try {
      const { username, email, password, fullName } = req.body;

      // التحقق من وجود المستخدم
      const existingUser = await User.findOne({ $or: [{ email }, { username }] });
      if (existingUser) {
        res.status(400).json({ success: false, message: 'المستخدم موجود بالفعل' });
        return;
      }

      // تشفير كلمة المرور
      const hashedPassword = await bcryptjs.hash(password, 10);

      // إنشاء مستخدم جديد
      const user = new User({
        username,
        email,
        password: hashedPassword,
        fullName,
      });

      await user.save();

      // إنشاء JWT token
      const token = jwt.sign({ userId: user._id }, env.JWT_SECRET, { expiresIn: env.JWT_EXPIRE });

      res.status(201).json({
        success: true,
        user: { _id: user._id, username, email, fullName },
        token,
      });
    } catch (error) {
      res.status(500).json({ success: false, message: 'خطأ في التسجيل', error });
    }
  }

  /**
   * تسجيل دخول المستخدم
   */
  async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email }).select('+password');
      if (!user) {
        res.status(401).json({ success: false, message: 'بيانات الدخول غير صحيحة' });
        return;
      }

      const isPasswordValid = await bcryptjs.compare(password, user.password);
      if (!isPasswordValid) {
        res.status(401).json({ success: false, message: 'بيانات الدخول غير صحيحة' });
        return;
      }

      const token = jwt.sign({ userId: user._id }, env.JWT_SECRET, { expiresIn: env.JWT_EXPIRE });

      res.json({
        success: true,
        user: { _id: user._id, username: user.username, email: user.email },
        token,
      });
    } catch (error) {
      res.status(500).json({ success: false, message: 'خطأ في تسجيل الدخول', error });
    }
  }

  /**
   * الحصول على ملف المستخدم
   */
  async getProfile(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).userId;
      const user = await User.findById(userId);

      if (!user) {
        res.status(404).json({ success: false, message: 'المستخدم غير موجود' });
        return;
      }

      res.json({ success: true, user });
    } catch (error) {
      res.status(500).json({ success: false, message: 'خطأ في جلب الملف', error });
    }
  }
}

export const authController = new AuthController();
