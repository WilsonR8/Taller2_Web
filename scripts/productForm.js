
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
    return;
  } else {
    productFormError.classList.add('hidden');
  }

  console.log(imageFiles);

  productFormLoading.classList.remove('hidden');
  productFormError.classList.add('hidden');

  const genericCatch = function (error) {
    productFormLoading.classList.add('hidden');
    productFormError.classList.remove('hidden');
    productFormError.innerHTML = 'There was an error in the product upload';
  }

  // Espera que suba la info a firestore
  db.collection("products").add(product).then(function (docRef) {

    const uploadPromises = [];
    const downloadUrlPromises = [];

    imageFiles.forEach(function (file) {
      var storageRef = firebase.storage().ref();
      var fileRef = storageRef.child(`products/${docRef.id}/${file.name}`);

      //Espera que suba la imagen
      uploadPromises.push(fileRef.put(file));

    });

    Promise.all(uploadPromises).then(function (snapshots) {
      snapshots.forEach(function (snapshot) {
        //Espera Url de la imagen
        downloadUrlPromises.push(snapshot.ref.getDownloadURL());
      });

      Promise.all(downloadUrlPromises).then(function (downloadURLs) {

        const images = [];
        downloadURLs.forEach(function (url, index) {
          images.push({
            url: url,
            ref: snapshots[index].ref.fullPath
          });
        });

        console.log(downloadURLs);

        db.collection("products").doc(docRef.id).update({
          images: images
        }).then(function () {
          productFormLoading.classList.add('hidden');
          productFormSuccess.classList.remove('hidden');
        })
        .catch(genericCatch);
      })
      .catch(genericCatch);
    })
    .catch(genericCatch);
  })
    .catch(genericCatch);

});