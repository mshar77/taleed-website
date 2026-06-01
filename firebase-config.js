// ========================================
// إعدادات Firebase
// ========================================
// تم إنشاؤها من Firebase Console
// https://console.firebase.google.com

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-app.js";
import { getDatabase, ref, set, remove, onValue } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-database.js";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-storage.js";

// إعدادات Firebase الخاصة بك
const firebaseConfig = {
  apiKey: "AIzaSyB-Spsi1fK4WNsR83DjIeBn1T9o3EJjP-g",
  authDomain: "taleed-website.firebaseapp.com",
  projectId: "taleed-website",
  storageBucket: "taleed-website.firebasestorage.app",
  messagingSenderId: "896657184485",
  appId: "1:896657184485:web:0142f0d7d2d97019cf660c",
  measurementId: "G-7Z365NEF66",
  databaseURL: "https://taleed-website-default-rtdb.firebaseio.com"
};

// ========================================
// تهيئة Firebase
// ========================================

// تهيئة Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const storage = getStorage(app);

console.log('✅ تم تهيئة Firebase بنجاح');

// ========================================
// دوال مساعدة للعمل مع Firebase
// ========================================

// 1. إضافة منتج جديد
export function addProductToFirebase(product) {
  return set(ref(database, 'products/' + product.id), product);
}

// 2. حذف منتج
export function deleteProductFromFirebase(productId) {
  return remove(ref(database, 'products/' + productId));
}

// 3. الحصول على جميع المنتجات
export function getProductsFromFirebase(callback) {
  const productsRef = ref(database, 'products');
  onValue(productsRef, (snapshot) => {
    const products = [];
    snapshot.forEach((childSnapshot) => {
      products.push(childSnapshot.val());
    });
    callback(products);
  });
}

// 4. إضافة قسم جديد
export function addCategoryToFirebase(category) {
  return set(ref(database, 'categories/' + category.id), category);
}

// 5. حذف قسم
export function deleteCategoryFromFirebase(categoryId) {
  return remove(ref(database, 'categories/' + categoryId));
}

// 6. الحصول على جميع الأقسام
export function getCategoriesFromFirebase(callback) {
  const categoriesRef = ref(database, 'categories');
  onValue(categoriesRef, (snapshot) => {
    const categories = [];
    snapshot.forEach((childSnapshot) => {
      categories.push(childSnapshot.val());
    });
    callback(categories);
  });
}

// 7. رفع صورة
export async function uploadImage(file) {
  const fileName = 'products/' + Date.now() + '_' + file.name;
  const imageRef = storageRef(storage, fileName);
  
  try {
    await uploadBytes(imageRef, file);
    const url = await getDownloadURL(imageRef);
    return url;
  } catch (error) {
    console.error('خطأ في رفع الصورة:', error);
    throw error;
  }
}

console.log('✅ تم تحميل جميع دوال Firebase بنجاح');
