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
const storage = firebase.storage();

const productForm = document.querySelector('.productForm');
const productFormLoading = document.querySelector('.productForm__loading');
const productFormSuccess = document.querySelector('.productForm__success');
const productFormError = document.querySelector('.productForm__error');
const productFormImages = document.querySelector('.productForm__images');


const coursesFields = document.querySelector('.coursesFields');
const pinsFields = document.querySelector('.pinsFields');

const imageFiles = [];


productForm.type.addEventListener('change', function () {
  console.log(productForm.type.value);
  coursesFields.classList.add('hidden');
  pinsFields.classList.add('hidden');
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


productForm.image.addEventListener('change', function () {
  const file = productForm.image.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function (event) {
    const productFormImg = document.createElement('img');
    productFormImg.classList.add('productForm__img');
    productFormImg.setAttribute('src', event.target.result);
    productFormImages.appendChild(productFormImg);
  }
  reader.readAsDataURL(file);

  imageFiles.push(file);

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
      product.size = [];
      if (productForm.size_s.checked) product.size.push('s');
      if (productForm.size_l.checked) product.size.push('l');
      break;

    case 'courses':
      product.software = [];
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
    //return;
  } else {
    productFormError.classList.add('hidden');
  }

  console.log(imageFiles);

  // Espera que suba la info a firestore
  db.collection("products").add(product).then(function (docRef) {
    console.log('document added', docRef.id);
    productFormLoading.classList.add('hidden');
    productFormSuccess.classList.remove('hidden');

    const uploadPromises=[];
    const downloadUrlPromises = [];

    imageFiles.forEach(function (file) {
      var storageRef = firebase.storage().ref();
      var fileRef = storageRef.child(`products/${docRef.id}/${file.name}`);

      //Espera que suba la imagen
      uploadPromises.push(fileRef.put(file));
   
    });

    Promise.all(uploadPromises).then(function(snapshots){
      snapshots.forEach(function(snapshot){
        //Espera Url de la imagen
        downloadUrlPromises.push(snapshot.ref.getDownloadURL());
      });

      Promise.all(downloadUrlPromises).then(function(downloadURLs){
        console.log(downloadURLs);
      });


    })
      
    /*
    .then((downloadURL) => {
          productFormLoading.classList.remove('hidden');
          product.imageUrl = downloadURL;
          product.imageRef = snapshot.ref.fullPath;

          console.log('File available at', downloadURL);
        });
    */

  })
    .catch(function (error) {
      productFormLoading.classList.add('hidden');
      productFormError.classList.remove('hidden');
    });

});