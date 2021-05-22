const firebaseConfig = {
  apiKey: "AIzaSyB_yqeeUcy1MciBK3RDe6pusFfskQ56tMs",
  authDomain: "taller2-web-40ef9.firebaseapp.com",
  projectId: "taller2-web-40ef9",
  storageBucket: "taller2-web-40ef9.appspot.com",
  messagingSenderId: "121288523965",
  appId: "1:121288523965:web:cd2316c0df6282adbeb7d4"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const storage = firebase.storage();

let loggedUser = null;

const setLoggedUser = (info, id) => {
  loggedUser = info;
  loggedUser.uid = id;
  userAuthChanged(true);
  if (typeof checkProductFormAdmin !== 'undefined') checkProductFormAdmin();
}

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    db.collection('users').doc(user.uid).get().then(function (doc) {
      if(!doc.data()) return;
      setLoggedUser(doc.data(), user.uid);
    });
    getMyCart(user.uid);
  } else {
    loggedUser = null;
    cart = [];
    userAuthChanged(false);
  }
});


let cart = [];
const cartBtnNumber = document.querySelector('.cartBtn .cartNumber');
const CART_COLLECTION = db.collection('cart');
const ORDERS_COLLECTION = db.collection('orders');

const addToMyCart = (product) => {
  cart.push(product);
  CART_COLLECTION.doc(loggedUser.uid).set({
    cart,
  });
  cartBtnNumber.innerText = cart.length;
};

let renderCart = null;

const getMyCart = (uid) => {
  CART_COLLECTION.doc(uid).get().then(snapShot => {
    const data = snapShot.data();
    if(!data) return;
    if(cartBtnNumber) cartBtnNumber.innerText = data.cart.length;
    cart = data.cart;
    if(renderCart) renderCart();
  });
}