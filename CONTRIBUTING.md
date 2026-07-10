# 🤝 دليل المساهمة - Quant Master

> **شكراً لاهتمامك بالمساهمة في Quant Master!**

---

## 🎯 مرحباً بك

نرحب بجميع المساهمات، سواء كانت:
- 🐛 تصحيح الأخطاء
- ✨ ميزات جديدة
- 📚 تحسين التوثيق
- 🎨 تحسينات في التصميم
- 🚀 تحسينات الأداء

---

## 📝 قبل البدء

1. ✅ اقرأ [README.md](./README.md)
2. ✅ اقرأ [INSTALLATION.md](./INSTALLATION.md)
3. ✅ اقرأ [API.md](./API.md)
4. ✅ تحقق من [Issues](https://github.com/y685n7jw6q-alt/quant-master-v2/issues)

---

## 🔄 Git Workflow

### الخطوة 1: Fork المشروع

```bash
# اضغط على Fork في أعلى الصفحة
https://github.com/y685n7jw6q-alt/quant-master-v2
```

### الخطوة 2: استنساخ المشروع

```bash
git clone https://github.com/YOUR_USERNAME/quant-master-v2.git
cd quant-master-v2
```

### الخطوة 3: إضافة upstream

```bash
git remote add upstream https://github.com/y685n7jw6q-alt/quant-master-v2.git
```

### الخطوة 4: إنشاء فرع جديد

```bash
# تحديث المشروع الأساسي
git fetch upstream
git checkout -b feature/your-feature-name upstream/main

# أو للأخطاء
git checkout -b fix/bug-name upstream/main
```

### الخطوة 5: إجراء التغييرات

```bash
# قم بالتغييرات المطلوبة
# اختبر التغييرات
```

### الخطوة 6: Commit التغييرات

```bash
git add .
git commit -m "نوع: وصف مختصر للتغيير"

# أمثلة:
# git commit -m "feat: إضافة ميزة جديدة للتحليل"
# git commit -m "fix: إصلاح خطأ في الحساب"
# git commit -m "docs: تحديث التوثيق"
```

### الخطوة 7: Push إلى Fork

```bash
git push origin feature/your-feature-name
```

### الخطوة 8: إنشاء Pull Request

1. اذهب إلى مستودعك على GitHub
2. اضغط على "Compare & pull request"
3. أكمل البيانات المطلوبة
4. اضغط "Create Pull Request"

---

## 📋 معايير الكود

### Commit Messages

```
<type>(<scope>): <subject>

<body>

<footer>
```

#### Types:
- **feat**: ميزة جديدة
- **fix**: إصلاح خطأ
- **docs**: تحديث التوثيق
- **style**: تنسيق الكود
- **refactor**: إعادة تنظيم الكود
- **perf**: تحسين الأداء
- **test**: إضافة اختبارات
- **chore**: تحديثات أخرى

#### مثال:
```
feat(analytics): إضافة رسم بياني جديد للأداء

إضافة رسم بياني تفاعلي يعرض تطور الأداء
على مدى الوقت مع خيارات التصفية.

Closes #123
```

### Code Style

#### TypeScript
```typescript
// ✅ ممتاز
const calculateScore = (answers: Answer[]): number => {
  return answers.filter(a => a.isCorrect).length;
};

// ❌ سيء
const calculateScore = (answers) => {
  let score = 0;
  for (let i = 0; i < answers.length; i++) {
    if (answers[i].isCorrect) score++;
  }
  return score;
};
```

#### Naming Conventions

```typescript
// Components: PascalCase
const AnalyticsDashboard = () => {};
const QuestionCard = () => {};

// Functions: camelCase
const calculateAccuracy = () => {};
const formatDate = () => {};

// Constants: UPPER_SNAKE_CASE
const MAX_ATTEMPTS = 10;
const API_TIMEOUT = 5000;

// Private properties: _camelCase
private _internalData = [];
```

### ESLint & Prettier

```bash
# تنسيق الكود
npm run format

# فحص الأخطاء
npm run lint

# إصلاح الأخطاء تلقائياً
npm run lint -- --fix
```

---

## 🧪 الاختبار

### كتابة الاختبارات

```typescript
describe('calculateAccuracy', () => {
  it('يجب أن يحسب الدقة بشكل صحيح', () => {
    const answers = [
      { isCorrect: true },
      { isCorrect: true },
      { isCorrect: false }
    ];
    expect(calculateAccuracy(answers)).toBe(66);
  });
});
```

### تشغيل الاختبارات

```bash
# تشغيل جميع الاختبارات
npm test

# مراقبة الملفات
npm test -- --watch

# تقرير التغطية
npm test -- --coverage
```

---

## 📚 التوثيق

### JSDoc Comments

```typescript
/**
 * حساب دقة الإجابات
 * @param answers - قائمة الإجابات
 * @returns نسبة الإجابات الصحيحة
 * @example
 * const accuracy = calculateAccuracy(answers);
 * console.log(accuracy); // 75
 */
const calculateAccuracy = (answers: Answer[]): number => {
  // ...
};
```

### Update Documentation

إذا أضفت ميزة جديدة، يجب تحديث:
- README.md
- API.md (إن لزم الأمر)
- INSTALLATION.md (إن لزم الأمر)

---

## 🐛 الإبلاغ عن الأخطاء

### قبل الإبلاغ

1. ✅ تحقق من [Issues الموجودة](https://github.com/y685n7jw6q-alt/quant-master-v2/issues)
2. ✅ تأكد من أن الخطأ قابل للتكرار
3. ✅ اجمع معلومات النظام

### نموذج الإبلاغ

```markdown
## وصف المشكلة
وصف واضح للمشكلة

## خطوات التكرار
1. ...
2. ...
3. ...

## السلوك المتوقع
ماذا يجب أن يحدث

## السلوك الفعلي
ماذا يحدث بالفعل

## معلومات النظام
- OS: macOS 10.15
- Node.js: 16.0.0
- npm: 7.0.0

## Screenshots (إن أمكن)
```

---

## ✨ اقتراح ميزات جديدة

### نموذج الاقتراح

```markdown
## الوصف
وصف واضح للميزة المطلوبة

## الفائدة
ما الفائدة من هذه الميزة؟

## الحل المقترح
كيف يمكن تنفيذها؟

## Alternatives
حلول بديلة
```

---

## 👥 Code Review

### ما الذي نبحث عنه

- ✅ الكود يتبع معايير المشروع
- ✅ الاختبارات موجودة وتمر بنجاح
- ✅ التوثيق محدث
- ✅ لا توجد أخطاء في الأداء
- ✅ الكود قابل للفهم والصيانة

### الرد على الملاحظات

1. ✅ اقرأ الملاحظات بعناية
2. ✅ اجري التغييرات المطلوبة
3. ✅ أجب على الأسئلة
4. ✅ اطلب مراجعة جديدة

---

## 📞 التواصل

- 📧 البريد: support@quantmaster.com
- 💬 Discussions: [اضغط هنا](https://github.com/y685n7jw6q-alt/quant-master-v2/discussions)
- 🐛 Issues: [اضغط هنا](https://github.com/y685n7jw6q-alt/quant-master-v2/issues)

---

## 🎉 شكراً!

شكراً لمساهمتك في جعل Quant Master أفضل! 🚀
