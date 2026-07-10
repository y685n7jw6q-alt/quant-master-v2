# 📚 Quant Master - AI-Powered Learning Platform

> **منصة تعليمية ذكية لتعلم العلوم الكمية والرياضيات باستخدام الذكاء الاصطناعي**

![Status](https://img.shields.io/badge/status-active-brightgreen)
![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Language](https://img.shields.io/badge/language-TypeScript-blue)

---

## 🌟 الميزات الرئيسية

### 📊 التحليل والإحصائيات
- ✅ لوحة بيانات شاملة للأداء
- ✅ تحليل نقاط القوة والضعف
- ✅ توصيات ذكية مخصصة
- ✅ رسوم بيانية تفاعلية
- ✅ تتبع التقدم العام

### 🎯 الأسئلة والتدريب
- ✅ أسئلة متعددة الخيارات (MCQ)
- ✅ دعم الصور والفيديوهات
- ✅ عداد الوقت مع تنبيهات صوتية
- ✅ شرح فوري لكل سؤال
- ✅ إعادة محاولة الأسئلة

### 🤖 الذكاء الاصطناعي
- ✅ شرح ذكي للإجابات
- ✅ توليد أسئلة ديناميكية
- ✅ خطط تعليمية مخصصة
- ✅ خطط علاجية ذكية

### 📱 واجهة المستخدم
- ✅ تصميم ريسبونسيف (Mobile/Desktop)
- ✅ واجهة عربية كاملة
- ✅ تجربة مستخدم سلسة
- ✅ الوضع الليلي (Dark Mode)

---

## 🛠️ المتطلبات

### متطلبات النظام
- **Node.js** >= 16.0.0
- **Docker** و **Docker Compose** (اختياري)
- **MongoDB** >= 5.0

### المتطلبات البرمجية
```bash
# Backend
- Express.js
- Mongoose
- JWT
- Socket.io

# Frontend
- React 18
- React Router
- Axios
- Recharts
- Tailwind CSS
```

---

## 🚀 التثبيت السريع

### الطريقة 1: باستخدام Docker (الأسهل)

```bash
# 1. استنساخ المشروع
git clone https://github.com/y685n7jw6q-alt/quant-master-v2.git
cd quant-master-v2

# 2. تشغيل الخوادم
docker-compose up -d

# 3. الدخول إلى الخدمات
- Frontend: http://localhost:3000
- Backend: http://localhost:5000
- Mongo Express: http://localhost:8081
```

### الطريقة 2: التثبيت اليدوي

#### Backend Setup

```bash
# 1. الدخول إلى مجلد Backend
cd backend

# 2. تثبيت المكتبات
npm install

# 3. إنشاء ملف .env
cp ../.env.example .env

# 4. تعديل البيانات في .env
# تأكد من أن MONGODB_URI صحيح

# 5. تشغيل الخادم
npm run dev
```

#### Frontend Setup

```bash
# 1. الدخول إلى مجلد Frontend (في tab جديد)
cd frontend

# 2. تثبيت المكتبات
npm install

# 3. إنشاء ملف .env
echo "REACT_APP_API_URL=http://localhost:5000/api" > .env

# 4. تشغيل التطبيق
npm start
```

---

## 📁 هيكل المشروع

```
quant-master-v2/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middleware/
│   │   └── server.ts
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── App.tsx
│   ├── package.json
│   └── tailwind.config.js
│
├── docker-compose.yml
├── init-mongo.js
├── .env.example
└── README.md
```

---

## 🔌 API Endpoints

### Authentication
```
POST   /api/auth/register      - تسجيل مستخدم جديد
POST   /api/auth/login         - تسجيل دخول
POST   /api/auth/logout        - تسجيل خروج
GET    /api/auth/profile       - الحصول على بيانات المستخدم
```

### Questions
```
GET    /api/questions           - الحصول على جميع الأسئلة
GET    /api/questions/:id       - الحصول على سؤال معين
POST   /api/questions           - إنشاء سؤال جديد (Admin)
PUT    /api/questions/:id       - تحديث سؤال (Admin)
DELETE /api/questions/:id       - حذف سؤال (Admin)
```

### Answers
```
POST   /api/answers/submit      - إرسال إجابة
GET    /api/answers/:userId     - الحصول على إجابات المستخدم
GET    /api/answers/stats/:userId - إحصائيات الإجابات
```

### Analytics
```
GET    /api/analytics/performance/:userId   - أداء المستخدم
GET    /api/analytics/report/:userId        - تقرير شامل
POST   /api/analytics/generate-plan/:userId - توليد خطة تعليمية
```

---

## 🔐 المصادقة والأمان

### JWT Authentication
```typescript
// كل طلب يحتاج إلى Token في Header
Authorization: Bearer <token>
```

### Password Security
```typescript
- Bcrypt للتشفير
- Salt Rounds: 10
- Rate Limiting: 100 requests/hour
```

---

## 🚀 خطوات التطوير

### تشغيل في بيئة التطوير

```bash
# Terminal 1: Backend
cd backend
npm run dev

# Terminal 2: Frontend
cd frontend
npm start
```

### البناء للإنتاج

```bash
# Build Backend
cd backend
npm run build

# Build Frontend
cd frontend
npm run build
```

---

## 🤝 المساهمة

نرحب بالمساهمات! يرجى اتباع الخطوات التالية:

1. Fork المشروع
2. أنشئ فرع جديد (`git checkout -b feature/AmazingFeature`)
3. Commit التغييرات (`git commit -m 'Add some AmazingFeature'`)
4. Push إلى الفرع (`git push origin feature/AmazingFeature`)
5. افتح Pull Request

---

## 📄 الترخيص

هذا المشروع مرخص تحت رخصة MIT. انظر ملف [LICENSE](./LICENSE) للمزيد من التفاصيل.

---

## 📞 التواصل والدعم

- 📧 البريد الإلكتروني: support@quantmaster.com
- 🐛 الإبلاغ عن الأخطاء: [Issues](https://github.com/y685n7jw6q-alt/quant-master-v2/issues)
- 💬 المناقشات: [Discussions](https://github.com/y685n7jw6q-alt/quant-master-v2/discussions)

---

## ⭐ شكر خاص

شكرا لاستخدامك Quant Master! لا تنسَ إضافة ⭐ للمشروع!

---

**صُنع بـ ❤️ من قبل فريق Quant Master**
