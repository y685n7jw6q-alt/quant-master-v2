# 🛠️ دليل التثبيت الكامل - Quant Master

> **شرح مفصل خطوة بخطوة لتثبيت وتشغيل منصة Quant Master**

---

## 📋 المتطلبات

### متطلبات النظام
- **OS**: Windows 10+, macOS 10.15+, أو Linux
- **RAM**: 4GB (الحد الأدنى)، 8GB (الموصى به)
- **Disk Space**: 2GB

### المتطلبات البرمجية

#### الطريقة 1: Docker (الموصى به)
- **Docker**: >= 20.10
- **Docker Compose**: >= 1.29

#### الطريقة 2: التثبيت اليدوي
- **Node.js**: >= 16.0.0
- **npm**: >= 7.0.0
- **MongoDB**: >= 5.0

---

## 🐳 الطريقة 1: التثبيت باستخدام Docker (الأسهل)

### الخطوة 1: التحقق من تثبيت Docker

```bash
# التحقق من تثبيت Docker
docker --version

# التحقق من تثبيت Docker Compose
docker-compose --version
```

**إذا لم تكن مثبتاً:**
- [تحميل Docker Desktop](https://www.docker.com/products/docker-desktop)

### الخطوة 2: استنساخ المشروع

```bash
# استنساخ المشروع
git clone https://github.com/y685n7jw6q-alt/quant-master-v2.git
cd quant-master-v2

# عرض المحتويات
ls -la
```

### الخطوة 3: إنشاء ملف .env

```bash
# نسخ ملف .env.example
cp .env.example .env

# تحرير الملف (اختياري - الإعدادات الافتراضية تعمل)
# nano .env  أو vim .env
```

### الخطوة 4: تشغيل الخوادم

```bash
# تشغيل جميع الخدمات
docker-compose up -d

# عرض السجلات (اختياري)
docker-compose logs -f

# التحقق من حالة الخدمات
docker-compose ps
```

### الخطوة 5: الدخول إلى الخدمات

```
🌐 Frontend:      http://localhost:3000
🔧 Backend:       http://localhost:5000
📊 Mongo Express: http://localhost:8081
```

### الخطوة 6: إيقاف الخدمات

```bash
# إيقاف جميع الخدمات
docker-compose down

# إيقاف وحذف البيانات
docker-compose down -v
```

---

## 📦 الطريقة 2: التثبيت اليدوي

### المتطلبات الأساسية

#### تثبيت Node.js
```bash
# على macOS (باستخدام Homebrew)
brew install node

# على Ubuntu/Debian
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# على Windows
# انتقل إلى https://nodejs.org/ وحمّل المثبت
```

#### التحقق من التثبيت
```bash
node --version
npm --version
```

#### تثبيت MongoDB

**على macOS:**
```bash
brew install mongodb-community
brew services start mongodb-community
```

**على Ubuntu/Debian:**
```bash
# إضافة المستودع
wget -qO - https://www.mongodb.org/static/pgp/server-5.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/5.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-5.0.list

# التثبيت
sudo apt-get update
sudo apt-get install -y mongodb-org

# بدء الخدمة
sudo systemctl start mongod
sudo systemctl enable mongod
```

**على Windows:**
- انتقل إلى [MongoDB Download Center](https://www.mongodb.com/try/download/community)
- حمّل وثبّت المثبت

### الخطوة 1: استنساخ المشروع

```bash
git clone https://github.com/y685n7jw6q-alt/quant-master-v2.git
cd quant-master-v2
```

### الخطوة 2: إعداد Backend

```bash
# الدخول إلى مجلد Backend
cd backend

# تثبيت المكتبات
npm install

# إنشاء ملف .env
cp ../.env.example .env

# تحرير .env إذا لزم الأمر
# nano .env
```

#### محتوى ملف .env للـ Backend:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/quant-master
JWT_SECRET=your-super-secret-key-change-in-production
NODE_ENV=development
ALLOWED_ORIGINS=http://localhost:3000
```

### الخطوة 3: إعداد Frontend

```bash
# الدخول إلى مجلد Frontend (في نافذة طرفية جديدة)
cd frontend

# تثبيت المكتبات
npm install

# إنشاء ملف .env
echo "REACT_APP_API_URL=http://localhost:5000/api" > .env
```

### الخطوة 4: تشغيل الخوادم

```bash
# Terminal 1: تشغيل Backend
cd backend
npm run dev

# Terminal 2: تشغيل Frontend (في نافذة جديدة)
cd frontend
npm start

# Terminal 3: (اختياري) عرض MongoDB
# mongosh (أو mongo في الإصدارات الأقدم)
```

### النتيجة المتوقعة:

```
✅ Backend يعمل على http://localhost:5000
✅ Frontend يعمل على http://localhost:3000
✅ MongoDB متصل
```

---

## ✅ التحقق من التثبيت

### اختبار Backend

```bash
# افتح متصفح أو استخدم curl
curl http://localhost:5000/api/health

# النتيجة المتوقعة:
# {"status": "OK", "message": "Backend is running"}
```

### اختبار Frontend

```bash
# افتح المتصفح على
# http://localhost:3000

# يجب أن ترى الصفحة الرئيسية
```

### اختبار MongoDB

```bash
# من خلال Mongo Express
# http://localhost:8081

# أو من خلال mongosh
mongosh
> show dbs
> use quant-master
> show collections
```

---

## 🐛 استكشاف الأخطاء الشائعة

### ❌ خطأ: "Port already in use"

```bash
# البحث عن العملية التي تستخدم المنفذ
# على macOS/Linux
lsof -i :5000

# على Windows
netstat -ano | findstr :5000

# إيقاف العملية
# على macOS/Linux
kill -9 <PID>

# على Windows
taskkill /PID <PID> /F

# أو تغيير المنفذ في .env
PORT=5001
```

### ❌ خطأ: "MongoDB Connection Failed"

```bash
# التحقق من حالة MongoDB
# على macOS
brew services list

# على Linux
sudo systemctl status mongod

# على Windows
# افتح Services وتحقق من MongoDB

# إعادة تشغيل MongoDB
# على macOS
brew services restart mongodb-community

# على Linux
sudo systemctl restart mongod
```

### ❌ خطأ: "npm ERR! code ERESOLVE"

```bash
# حل 1: استخدام flag خاص
npm install --legacy-peer-deps

# حل 2: حذف node_modules و package-lock.json
rm -rf node_modules package-lock.json
npm install
```

### ❌ خطأ: "CORS Error"

```bash
# تأكد من أن ALLOWED_ORIGINS صحيح في .env
ALLOWED_ORIGINS=http://localhost:3000

# أو للبيئة الإنتاجية:
ALLOWED_ORIGINS=https://yourwebsite.com
```

### ❌ خطأ: Docker لا يعمل

```bash
# إعادة تشغيل Docker
# على macOS
sudo pkill -9 com.docker.osx.hyperkit

# على Windows
# افتح Docker Desktop وأعده تشغيل

# إعادة بناء الـ Images
docker-compose build --no-cache
docker-compose up -d
```

---

## ⚙️ الإعدادات المتقدمة

### تغيير قاعدة البيانات

```env
# MongoDB على سيرفر خارجي
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/quant-master

# مع Authentication
MONGODB_URI=mongodb://user:password@localhost:27017/quant-master
```

### إعدادات JWT

```env
# استخدام مفتاح قوي جداً للإنتاج
JWT_SECRET=generate-a-strong-random-string-here

# مثال (لا تستخدمه في الإنتاج):
JWT_SECRET=$(openssl rand -hex 32)
```

### إعدادات البريد الإلكتروني

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password  # ليس كلمة السر العادية!
```

### إعدادات الـ Rate Limiting

```env
RATE_LIMIT_WINDOW_MS=3600000    # ساعة واحدة
RATE_LIMIT_MAX_REQUESTS=100     # 100 طلب في الساعة
```

---

## 📝 ملفات مهمة

- `.env` - متغيرات البيئة
- `.env.example` - قالب متغيرات البيئة
- `docker-compose.yml` - إعدادات Docker
- `init-mongo.js` - سكريبت تهيئة MongoDB

---

## 🚀 الخطوات التالية

بعد التثبيت الناجح:

1. ✅ إنشاء حساب جديد
2. ✅ تسجيل الدخول
3. ✅ استكشاف لوحة المعلومات
4. ✅ حل بعض الأسئلة
5. ✅ عرض التحليلات

---

## 💡 نصائح مفيدة

### تطوير فعال

```bash
# استخدم Nodemon للـ auto-reload
npm install -g nodemon

# أو في scripts
npm run dev  # هذا يستخدم nodemon تلقائياً
```

### مراقبة قاعدة البيانات

```bash
# استخدم Mongo Express
http://localhost:8081

# أو mongosh
mongosh
```

### تصحيح الأخطاء

```bash
# تفعيل Debug Mode في Backend
DEBUG=* npm run dev

# في Frontend
REACT_APP_DEBUG=true npm start
```

---

## 📞 الحصول على المساعدة

إذا واجهت مشاكل:

1. 📖 اقرأ [README.md](./README.md)
2. 🔍 ابحث في [Issues](https://github.com/y685n7jw6q-alt/quant-master-v2/issues)
3. 💬 اسأل في [Discussions](https://github.com/y685n7jw6q-alt/quant-master-v2/discussions)
4. 📧 تواصل معنا عبر البريد

---

**تم! أنت جاهز لاستخدام Quant Master! 🎉**
