import { Request, Response, NextFunction } from 'express';

export const validationMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  // التحقق من المدخلات الأساسية
  if (req.method === 'POST' || req.method === 'PUT') {
    if (!req.body || Object.keys(req.body).length === 0) {
      res.status(400).json({ success: false, message: 'المدخلات مطلوبة' });
      return;
    }
  }

  next();
};
