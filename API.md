# 🔌 API Documentation - Quant Master

> **توثيق كامل لـ API منصة Quant Master**

---

## 📌 معلومات عامة

### Base URL

```
Development:  http://localhost:5000/api
Production:   https://api.quantmaster.com/api
```

### المصادقة

كل طلب (ما عدا التسجيل والدخول) يجب أن يتضمن JWT Token:

```
Authorization: Bearer <your_token_here>
```

### Headers المطلوبة

```
Content-Type: application/json
Authorization: Bearer <token>
```

### Status Codes

| Code | المعنى |
|------|-------|
| 200 | ✅ نجاح |
| 201 | ✅ تم الإنشاء |
| 400 | ❌ طلب خاطئ |
| 401 | ❌ غير مصرح (بحاجة لـ Token) |
| 403 | ❌ ممنوع الوصول |
| 404 | ❌ غير موجود |
| 429 | ❌ عدد الطلبات كثير جداً |
| 500 | ❌ خطأ في الخادم |

---

## 🔐 Authentication Endpoints

### 1️⃣ تسجيل مستخدم جديد

```
POST /api/auth/register
```

#### Request Body:
```json
{
  "email": "user@example.com",
  "password": "SecurePassword123!",
  "fullName": "أحمد محمد"
}
```

#### Response (201 Created):
```json
{
  "success": true,
  "message": "تم التسجيل بنجاح",
  "data": {
    "user": {
      "_id": "507f1f77bcf86cd799439011",
      "email": "user@example.com",
      "fullName": "أحمد محمد",
      "createdAt": "2024-01-10T10:30:00Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

#### cURL Example:
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "SecurePassword123!",
    "fullName": "أحمد محمد"
  }'
```

---

### 2️⃣ تسجيل الدخول

```
POST /api/auth/login
```

#### Request Body:
```json
{
  "email": "user@example.com",
  "password": "SecurePassword123!"
}
```

#### Response (200 OK):
```json
{
  "success": true,
  "message": "تم تسجيل الدخول بنجاح",
  "data": {
    "user": {
      "_id": "507f1f77bcf86cd799439011",
      "email": "user@example.com",
      "fullName": "أحمد محمد"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

#### JavaScript Example:
```javascript
const response = await fetch('http://localhost:5000/api/auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    email: 'user@example.com',
    password: 'SecurePassword123!'
  })
});

const data = await response.json();
localStorage.setItem('token', data.data.token);
```

---

### 3️⃣ الحصول على بيانات المستخدم

```
GET /api/auth/profile
```

#### Headers:
```
Authorization: Bearer <token>
```

#### Response (200 OK):
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "email": "user@example.com",
    "fullName": "أحمد محمد",
    "createdAt": "2024-01-10T10:30:00Z"
  }
}
```

#### Axios Example:
```javascript
const token = localStorage.getItem('token');
const response = await axios.get('http://localhost:5000/api/auth/profile', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
});

console.log(response.data);
```

---

### 4️⃣ تسجيل الخروج

```
POST /api/auth/logout
```

#### Headers:
```
Authorization: Bearer <token>
```

#### Response (200 OK):
```json
{
  "success": true,
  "message": "تم تسجيل الخروج بنجاح"
}
```

---

## ❓ Questions Endpoints

### 1️⃣ الحصول على جميع الأسئلة

```
GET /api/questions?page=1&limit=10&difficulty=medium&topic=calculus
```

#### Query Parameters:
| Parameter | Type | Required | الوصف |
|-----------|------|----------|--------|
| page | number | ❌ | رقم الصفحة (افتراضي: 1) |
| limit | number | ❌ | عدد النتائج (افتراضي: 10) |
| difficulty | string | ❌ | easy, medium, hard |
| topic | string | ❌ | اسم الموضوع |

#### Response (200 OK):
```json
{
  "success": true,
  "data": {
    "questions": [
      {
        "_id": "507f1f77bcf86cd799439011",
        "text": "ما هو التفاضل؟",
        "options": [
          { "id": "a", "text": "دالة" },
          { "id": "b", "text": "معدل التغير" }
        ],
        "difficulty": "medium",
        "topic": "calculus",
        "timeLimit": 60
      }
    ],
    "total": 150,
    "page": 1,
    "pages": 15
  }
}
```

---

### 2️⃣ الحصول على سؤال محدد

```
GET /api/questions/:id
```

#### URL Parameters:
```
:id - معرف السؤال
```

#### Response (200 OK):
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "text": "ما هو التفاضل؟",
    "images": ["url1", "url2"],
    "videoUrl": "https://youtube.com/...",
    "options": [
      { "id": "a", "text": "دالة", "value": "a" },
      { "id": "b", "text": "معدل التغير", "value": "b" }
    ],
    "correctAnswer": "b",
    "explanation": "التفاضل هو معدل التغير...",
    "difficulty": "medium",
    "topic": "calculus",
    "skillId": "skill_123",
    "timeLimit": 60
  }
}
```

---

### 3️⃣ إنشاء سؤال جديد (Admin فقط)

```
POST /api/questions
```

#### Headers:
```
Authorization: Bearer <admin_token>
```

#### Request Body:
```json
{
  "text": "ما هو التفاضل؟",
  "options": [
    { "text": "دالة", "value": "a" },
    { "text": "معدل التغير", "value": "b" }
  ],
  "correctAnswer": "b",
  "explanation": "شرح مفصل للإجابة",
  "difficulty": "medium",
  "topic": "calculus",
  "timeLimit": 60
}
```

#### Response (201 Created):
```json
{
  "success": true,
  "message": "تم إنشاء السؤال بنجاح",
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "text": "ما هو التفاضل؟",
    "...": "..."
  }
}
```

---

## ✅ Answers Endpoints

### 1️⃣ إرسال إجابة

```
POST /api/answers/submit
```

#### Headers:
```
Authorization: Bearer <token>
```

#### Request Body:
```json
{
  "questionId": "507f1f77bcf86cd799439011",
  "answer": "b",
  "timeSpent": 45
}
```

#### Response (201 Created):
```json
{
  "success": true,
  "message": "تم حفظ الإجابة",
  "data": {
    "_id": "507f1f77bcf86cd799439050",
    "userId": "507f1f77bcf86cd799439001",
    "questionId": "507f1f77bcf86cd799439011",
    "answer": "b",
    "isCorrect": true,
    "timeSpent": 45,
    "createdAt": "2024-01-10T10:30:00Z"
  }
}
```

#### Axios Example:
```javascript
const token = localStorage.getItem('token');

const response = await axios.post(
  'http://localhost:5000/api/answers/submit',
  {
    questionId: '507f1f77bcf86cd799439011',
    answer: 'b',
    timeSpent: 45
  },
  {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }
);

console.log(response.data);
```

---

### 2️⃣ الحصول على إجابات المستخدم

```
GET /api/answers/:userId?page=1&limit=20
```

#### Response (200 OK):
```json
{
  "success": true,
  "data": {
    "answers": [
      {
        "_id": "507f1f77bcf86cd799439050",
        "questionId": "507f1f77bcf86cd799439011",
        "answer": "b",
        "isCorrect": true,
        "timeSpent": 45,
        "createdAt": "2024-01-10T10:30:00Z"
      }
    ],
    "total": 125,
    "page": 1,
    "pages": 7
  }
}
```

---

### 3️⃣ إحصائيات الإجابات

```
GET /api/answers/stats/:userId
```

#### Response (200 OK):
```json
{
  "success": true,
  "data": {
    "totalAnswers": 125,
    "correctAnswers": 95,
    "accuracy": 76,
    "averageTime": 48.5,
    "fastestAnswer": 15,
    "slowestAnswer": 120,
    "byTopic": {
      "calculus": { "total": 30, "correct": 25, "accuracy": 83 },
      "algebra": { "total": 25, "correct": 18, "accuracy": 72 }
    }
  }
}
```

---

## 📊 Analytics Endpoints

### 1️⃣ أداء المستخدم

```
GET /api/analytics/performance/:userId
```

#### Response (200 OK):
```json
{
  "success": true,
  "data": {
    "userId": "507f1f77bcf86cd799439001",
    "skills": [
      {
        "skillId": "skill_001",
        "name": "التفاضل",
        "masteryLevel": 85,
        "accuracy": 90,
        "totalAttempts": 30,
        "lastAttempt": "2024-01-10T10:30:00Z",
        "trend": "up"
      }
    ],
    "overallAccuracy": 76,
    "totalAttempts": 125,
    "learningRate": 2.5,
    "consistency": 8.5
  }
}
```

---

### 2️⃣ توليد خطة تعليمية

```
POST /api/analytics/generate-plan/:userId
```

#### Headers:
```
Authorization: Bearer <token>
```

#### Request Body:
```json
{
  "focusAreas": ["calculus", "algebra"],
  "difficulty": "intermediate",
  "duration": 7
}
```

#### Response (201 Created):
```json
{
  "success": true,
  "message": "تم توليد الخطة بنجاح",
  "data": {
    "_id": "507f1f77bcf86cd799439100",
    "userId": "507f1f77bcf86cd799439001",
    "title": "خطة تعليمية شخصية",
    "skills": ["skill_001", "skill_002"],
    "estimatedDuration": 7,
    "status": "active",
    "createdAt": "2024-01-10T10:30:00Z"
  }
}
```

---

## ⚠️ معالجة الأخطاء

### Error Response Example:

```json
{
  "success": false,
  "message": "رسالة الخطأ",
  "error": {
    "code": "INVALID_EMAIL",
    "details": "البريد الإلكتروني غير صالح"
  }
}
```

### Errors الشائعة:

#### ❌ 401 Unauthorized
```json
{
  "success": false,
  "message": "Token غير صالح أو منتهي الصلاحية"
}
```

#### ❌ 400 Bad Request
```json
{
  "success": false,
  "message": "البيانات المدخلة غير صحيحة",
  "errors": {
    "email": "البريد الإلكتروني مطلوب",
    "password": "كلمة المرور يجب أن تكون 8 أحرف على الأقل"
  }
}
```

#### ❌ 429 Too Many Requests
```json
{
  "success": false,
  "message": "تم تجاوز عدد الطلبات المسموح به",
  "retryAfter": 3600
}
```

---

## 🔄 Rate Limiting

```
- 100 طلب لكل ساعة (3600 ثانية)
- Headers:
  X-RateLimit-Limit: 100
  X-RateLimit-Remaining: 45
  X-RateLimit-Reset: 1234567890
```

---

## 📝 Best Practices

### ✅ المميز:

```javascript
// حفظ Token بشكل آمن
localStorage.setItem('token', response.data.token);

// استخدام Headers الصحيحة
const config = {
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
};

// التعامل مع الأخطاء
try {
  const response = await axios.get(url, config);
} catch (error) {
  if (error.response?.status === 401) {
    // Token منتهي - أعد تسجيل الدخول
    logout();
  }
}
```

### ❌ تجنب:

```javascript
// لا تحفظ كلمة السر
localStorage.setItem('password', password);

// لا تضع Token في URL
fetch(`/api/endpoint?token=${token}`);

// لا تتجاهل الأخطاء
await fetch(url);
```

---

## 🧪 اختبار الـ API

### استخدام Postman

1. اذهب إلى [postman.com](https://www.postman.com/downloads/)
2. ثبّت Postman
3. اضغط على Collections > New
4. أضف الـ Endpoints

### استخدام curl

```bash
# تسجيل
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"user@test.com","password":"123456"}'

# الحصول على الأسئلة
curl -X GET "http://localhost:5000/api/questions?page=1&limit=10" \
  -H "Authorization: Bearer <token>"
```

---

## 📞 الدعم والمساعدة

- 📧 البريد: api-support@quantmaster.com
- 📖 التوثيق: [README.md](./README.md)
- 🐛 المشاكل: [Issues](https://github.com/y685n7jw6q-alt/quant-master-v2/issues)

---

**آخر تحديث: 10 يناير 2024** ✅
