# 🔥 شرح إعداد Firebase

هذا الملف يشرح كيفية ربط موقعك بـ Firebase لحفظ البيانات على السيرفر.

---

## 📋 الخطوات

### **الخطوة 1: إنشاء حساب Firebase**

1. اذهب إلى: https://firebase.google.com
2. اضغط "Get Started"
3. سجل دخول بحساب Google
4. اضغط "Create a project"

---

### **الخطوة 2: إنشاء مشروع جديد**

1. أدخل اسم المشروع: `taleed-website`
2. اضغط "Continue"
3. اختر "Disable Google Analytics" (اختياري)
4. اضغط "Create project"
5. انتظر حتى ينتهي الإنشاء

---

### **الخطوة 3: إضافة تطبيق ويب**

1. في Firebase Console، اضغط على أيقونة الويب `</>`
2. أدخل اسم التطبيق: `taleed-website`
3. اضغط "Register app"
4. **انسخ الإعدادات** (ستحتاجها في الخطوة التالية)

---

### **الخطوة 4: نسخ الإعدادات**

ستجد كود يشبه هذا:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyD...",
  authDomain: "taleed-website.firebaseapp.com",
  databaseURL: "https://taleed-website.firebaseio.com",
  projectId: "taleed-website",
  storageBucket: "taleed-website.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123def456"
};
```

**انسخ هذا الكود كاملاً**

---

### **الخطوة 5: لصق الإعدادات في الملف**

1. افتح ملف `firebase-config.js`
2. استبدل الإعدادات القديمة بالإعدادات الجديدة
3. احفظ الملف

---

### **الخطوة 6: تفعيل Realtime Database**

1. في Firebase Console، اذهب إلى "Realtime Database"
2. اضغط "Create Database"
3. اختر "Start in test mode" (للتطوير)
4. اختر المنطقة الأقرب
5. اضغط "Enable"

---

### **الخطوة 7: تفعيل Storage**

1. في Firebase Console، اذهب إلى "Storage"
2. اضغط "Get Started"
3. اختر "Start in test mode"
4. اختر المنطقة
5. اضغط "Done"

---

### **الخطوة 8: تحديث ملفات الموقع**

1. أضف هذا السطر في ملف `index.html` قبل `</head>`:
```html
<!-- Firebase -->
<script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-database.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-storage.js"></script>
<script src="firebase-config.js"></script>
```

2. أضف نفس السطور في ملف `admin-panel.html`

---

### **الخطوة 9: اختبر الموقع**

1. افتح الموقع الأساسي
2. افتح لوحة التحكم
3. أضف منتج جديد
4. شوف البيانات تُحفظ في Firebase! ✅

---

## 🔐 قواعد الأمان

**مهم جداً:** قبل النشر على الإنترنت، غيّر قواعد الأمان:

1. في Firebase Console، اذهب إلى "Realtime Database"
2. اذهب إلى تبويب "Rules"
3. استبدل القواعد بهذا:

```json
{
  "rules": {
    "products": {
      ".read": true,
      ".write": false
    },
    "categories": {
      ".read": true,
      ".write": false
    }
  }
}
```

4. اضغط "Publish"

---

## 📚 ملفات مهمة

- `firebase-config.js` - إعدادات Firebase
- `index.html` - الموقع الأساسي
- `admin-panel.html` - لوحة التحكم

---

## 🆘 استكشاف الأخطاء

### **المشكلة: البيانات لا تُحفظ**
- ✅ تأكد من نسخ الإعدادات بشكل صحيح
- ✅ تأكد من تفعيل Realtime Database
- ✅ افتح console في المتصفح (F12) وشوف الأخطاء

### **المشكلة: لا تظهر البيانات**
- ✅ تأكد من قراءة البيانات من Firebase
- ✅ تأكد من تحديث الصفحة

### **المشكلة: خطأ في الأمان**
- ✅ تأكد من قواعد الأمان صحيحة
- ✅ تأكد من تفعيل Storage

---

## 📞 الدعم

إذا واجهت أي مشكلة:
1. افتح Firebase Console
2. اذهب إلى "Logs"
3. شوف الأخطاء
4. ابحث عن الحل

---

**تم! الآن موقعك متصل بـ Firebase! 🎉**
