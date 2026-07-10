import { IUser } from '../types/user';

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (password.length < 8) {
    errors.push('كلمة المرور يجب أن تكون 8 أحرف على الأقل');
  }
  if (!/[A-Z]/.test(password)) {
    errors.push('كلمة المرور يجب أن تحتوي على حرف كبير');
  }
  if (!/[0-9]/.test(password)) {
    errors.push('كلمة المرور يجب أن تحتوي على رقم');
  }
  if (!/[^A-Za-z0-9]/.test(password)) {
    errors.push('كلمة المرور يجب أن تحتوي على رمز خاص');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
};

export const validateUsername = (username: string): boolean => {
  return /^[a-zA-Z0-9_-]{3,20}$/.test(username);
};

export const validateUserData = (user: Partial<IUser>): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!user.username || !validateUsername(user.username)) {
    errors.push('اسم المستخدم غير صالح');
  }

  if (!user.email || !validateEmail(user.email)) {
    errors.push('البريد الإلكتروني غير صالح');
  }

  if (!user.fullName || user.fullName.length < 3) {
    errors.push('الاسم الكامل غير صالح');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
};

export const validateNumberInput = (value: any): boolean => {
  return typeof value === 'number' || (typeof value === 'string' && !isNaN(Number(value)));
};
