// ========================================
// ملف ربط Firebase
// ========================================
// يحتوي على جميع وظائف Firebase الأساسية

// إعدادات Firebase
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

// تهيئة Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();
const storage = firebase.storage();

console.log('✅ تم تهيئة Firebase بنجاح');

// ========================================
// دوال Firebase
// ========================================

// 1. حفظ المنتجات في Firebase
function saveProductsToFirebase(products) {
  return database.ref('products').set(products)
    .then(() => {
      console.log('✅ تم حفظ المنتجات في Firebase');
      return true;
    })
    .catch((error) => {
      console.error('❌ خطأ في حفظ المنتجات:', error);
      return false;
    });
}

// 2. حفظ الأقسام في Firebase
function saveCategoriesToFirebase(categories) {
  return database.ref('categories').set(categories)
    .then(() => {
      console.log('✅ تم حفظ الأقسام في Firebase');
      return true;
    })
    .catch((error) => {
      console.error('❌ خطأ في حفظ الأقسام:', error);
      return false;
    });
}

// 3. سحب المنتجات من Firebase
function getProductsFromFirebase(callback) {
  database.ref('products').on('value', (snapshot) => {
    const products = snapshot.val() || [];
    
    // تحويل الكائن إلى مصفوفة إذا لزم الأمر
    if (typeof products === 'object' && !Array.isArray(products)) {
      const productsArray = [];
      for (let key in products) {
        productsArray.push(products[key]);
      }
      callback(productsArray);
    } else {
      callback(Array.isArray(products) ? products : []);
    }
  }, (error) => {
    console.error('❌ خطأ في سحب المنتجات:', error);
    callback([]);
  });
}

// 4. سحب الأقسام من Firebase
function getCategoriesFromFirebase(callback) {
  database.ref('categories').on('value', (snapshot) => {
    const categories = snapshot.val() || [];
    
    // تحويل الكائن إلى مصفوفة إذا لزم الأمر
    if (typeof categories === 'object' && !Array.isArray(categories)) {
      const categoriesArray = [];
      for (let key in categories) {
        categoriesArray.push(categories[key]);
      }
      callback(categoriesArray);
    } else {
      callback(Array.isArray(categories) ? categories : []);
    }
  }, (error) => {
    console.error('❌ خطأ في سحب الأقسام:', error);
    callback([]);
  });
}

// 5. حذف منتج من Firebase
function deleteProductFromFirebase(productId) {
  return database.ref('products').once('value', (snapshot) => {
    const products = snapshot.val() || [];
    const filteredProducts = products.filter(p => p.id !== productId);
    return database.ref('products').set(filteredProducts);
  });
}

// 6. حذف قسم من Firebase
function deleteCategoryFromFirebase(categoryId) {
  return database.ref('categories').once('value', (snapshot) => {
    const categories = snapshot.val() || [];
    const filteredCategories = categories.filter(c => c.id !== categoryId);
    return database.ref('categories').set(filteredCategories);
  });
}

// 7. رفع صورة إلى Firebase Storage
function uploadImageToFirebase(file) {
  return new Promise((resolve, reject) => {
    const fileName = 'products/' + Date.now() + '_' + file.name;
    const storageRef = storage.ref(fileName);
    
    storageRef.put(file)
      .then((snapshot) => {
        return snapshot.ref.getDownloadURL();
      })
      .then((url) => {
        console.log('✅ تم رفع الصورة بنجاح:', url);
        resolve(url);
      })
      .catch((error) => {
        console.error('❌ خطأ في رفع الصورة:', error);
        reject(error);
      });
  });
}

console.log('✅ تم تحميل جميع دوال Firebase بنجاح');
