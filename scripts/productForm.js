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

const coursesFields = document.querySelector('.coursesFields');
const pinsFields = document.querySelector('.pinsFields');


productForm.type.addEventListener('change', function () {
  console.log(productForm.type.value);
  coursesFields.classList.add('hidden');
  switch (productForm.type.value) {
    case 'courses':
      coursesFields.classList.remove('hidden');
      break;
    case 'assets':
      coursesFields.classList.remove('hidden');
      break;
    case 'pins':
      pinsFields.classList.remove('hidden');
      break;


  }
});

productForm.addEventListener('submit', function (event) {
  event.preventDefault();



  const product = {
    type: productForm.type.value,
    name: productForm.name.value,
    price: parseInt(productForm.price.value),
    rate: parseInt(productForm.rate.value),
    description: productForm.description.value,
  

  };

  switch (product.type) {
    case 'pins':
      product.size=[];
      if (productForm.size_s.checked) product.size.push('s');
      if (productForm.size_l.checked) product.size.push('l');
      break;

    case 'courses':
      product.software=[];
      if (productForm.soft_pr.checked) product.software.push('pr');
      if (productForm.soft_ae.checked) product.software.push('ae');
      if (productForm.soft_ai.checked) product.software.push('ai');
      if (productForm.soft_id.checked) product.software.push('id');
      if (productForm.soft_ps.checked) product.software.push('ps');
      if (productForm.soft_lr.checked) product.software.push('lr');
      break;
  }



  let error = "";



  if (!product.name) {
    error += "The product name is required.<br/>";
  }

  if (!product.description) {
    error += "The product name is required.<br/>";
  }

  if (!product.price > 1000) {
    error += "The product price is required.<br/>";
  }

  if (!product.rate > 6) {
    error += "The product rate is required.<br/>";
  }

  if (!product.type) {
    error += "You must select a product type.<br/>";
  }
  if (error) {
    productFormError.innerHTML = error;
    productFormError.classList.remove('hidden');
    return;
  } else {
    productFormError.classList.add('hidden');
  }
  console.log(product);

  productFormLoading.classList.remove('hidden');
  db.collection("products").add(product).then(function (docRef) {
    console.log('document added', docRef.id);
    productFormLoading.classList.add('hidden');
    productFormSuccess.classList.remove('hidden');
  })
    .catch(function (error) {
      productFormLoading.classList.add('hidden');
      productFormError.classList.remove('hidden');
    });

});