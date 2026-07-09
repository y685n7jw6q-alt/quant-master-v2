import { IErrorLog } from '../models';

export class ErrorAnalyzer {
  /**
   * تصنيف نوع الخطأ
   */
  classifyError(
    userAnswer: string | number,
    correctAnswer: string | number,
    errorPattern: string
  ): 'conceptual' | 'calculation' | 'careless' {
    // الأخطاء المفاهيمية
    if (errorPattern.includes('concept') || errorPattern.includes('formula')) {
      return 'conceptual';
    }

    // الأخطاء الحسابية
    if (errorPattern.includes('calc') || errorPattern.includes('arithmetic')) {
      return 'calculation';
    }

    // الأخطاء السهوية
    return 'careless';
  }

  /**
   * تحديد السبب الجذري للخطأ
   */
  diagnoseError(errorType: 'conceptual' | 'calculation' | 'careless'): string {
    const diagnoses: Record<string, string> = {
      conceptual: 'عدم فهم المفهوم الأساسي',
      calculation: 'خطأ في العملية الحسابية',
      careless: 'خطأ في الانتباه',
    };
    return diagnoses[errorType];
  }

  /**
   * توصية بمهارة التعزيز
   */
  recommendRemediationSkill(errorCode: string): string {
    // خريطة الأخطاء إلى مهارات التعزيز
    const remediationMap: Record<string, string> = {
      'ALG001-ERR01': 'ALG001-01', // خطأ في الجمع -> مراجعة الجمع
      'ALG001-ERR02': 'ALG001-02', // خطأ في الترتيب -> مراجعة الترتيب
    };

    return remediationMap[errorCode] || errorCode;
  }

  /**
   * حساب شدة الخطأ
   */
  calculateErrorSeverity(frequency: number, impact: number): 'critical' | 'major' | 'minor' {
    const severity = frequency * impact;

    if (severity >= 8) return 'critical';
    if (severity >= 5) return 'major';
    return 'minor';
  }

  /**
   * توليد خطة علاجية
   */
  generateRemediationPlan(error: Partial<IErrorLog>): { steps: string[]; estimatedTime: number } {
    const steps: string[] = [
      'قراءة شرح المفهوم',
      'حل أمثلة مشابهة',
      'الإجابة على أسئلة تدريبية',
      'اختبار فهمك',
    ];

    return {
      steps,
      estimatedTime: 30, // دقائق
    };
  }

  /**
   * تحليل أنماط الأخطاء
   */
  analyzeErrorPatterns(errors: Partial<IErrorLog>[]): Record<string, number> {
    const patterns: Record<string, number> = {};

    errors.forEach((error) => {
      if (error.errorCode) {
        patterns[error.errorCode] = (patterns[error.errorCode] || 0) + 1;
      }
    });

    return patterns;
  }
}

export const errorAnalyzer = new ErrorAnalyzer();
