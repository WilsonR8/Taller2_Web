var firebaseConfig = {
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

const productForm = document.querySelector('.productForm');
const productFormLoading = document.querySelector('.productForm__loading');
const productFormSuccess = document.querySelector('.productForm__success');
const productFormError = document.querySelector('.productForm__error');

productForm.addEventListener('submit',function(event){
    event.preventDefault();
  
   

    const product = {
        name: productForm.name.value,
        price: parseInt(productForm.price.value),
        rate: parseInt(productForm.rate.value),
        software: [],

    };
    if(productForm.soft_pr.checked) product.software.push('pr');
    if(productForm.soft_ae.checked) product.software.push('ae');
    if(productForm.soft_ai.checked) product.software.push('ai');
    if(productForm.soft_id.checked) product.software.push('id');
    if(productForm.soft_ps.checked) product.software.push('ps');
    if(productForm.soft_lr.checked) product.software.push('lr');

  console.log(product);

  productFormLoading.classList.remove('hidden');
  db.collection("products").add(product).then(function(docRef){
    console.log('document added',docRef.id);
    productFormLoading.classList.add('hidden');
    productFormSuccess.classList.remove('hidden');
  })
  .catch(function (error) {
    productFormLoading.classList.add('hidden');
    productFormError.classList.remove('hidden');
  });

});