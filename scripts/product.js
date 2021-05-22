const params = new URLSearchParams(location.search);
const id = params.get('id');

if(!id){
    location.href='./404.html';
}

const productImg = document.querySelector('.product__img');
const productName = document.querySelector('.product__name');
const productDescription = document.querySelector('.product__description');
const productPrice = document.querySelector('.product__price');
const productType = document.querySelector('.product__type');

function getTypeLabel (type){

}

db.collection('products')
.doc(id)
.get()
.then(function(doc){
    const data = doc.data();
    if(!data){
        location.href='./404.html';
    }

    productImg.setAttribute('src',data.images[0].url);
    productName.innerText = data.name;
    productDescription.innerText = data.description;
    productPrice.innerText = `$ ${data.price}`;
    productType.innerHTML = `Type: <strong>${data.type}</strong>`;

console.log(doc.id,doc.data());
});

const cartBtn = document.querySelector('a .items__cartBtn');
cartBtn.addEventListener('click', function () {
    /*cart.push(data);
    localStorage.setItem('store__cart', JSON.stringify(cart));
    cartBtnNumber.innerText = cart.length;*/
  addToMyCart({
    ...data,
    id: doc.id,
  });
});