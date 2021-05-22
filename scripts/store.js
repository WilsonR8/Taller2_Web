const list = document.querySelector('.list');


const handleCollectionResult = (querySnapshot) => {
    list.innerHTML = '';
    querySnapshot.forEach((doc) => {
        const data = doc.data();
        const items = document.createElement('div');
        let img = data.images[0]?.url;
        if (!img) {
            img = './img/placeholder.png';
        }
        items.innerHTML = `
        <a class="product" href="./product.html?id=${doc.id}&name-${data.name}">
        <img class="items__img" src="${img}">
        </a>

        <a class="product" href="./product.html?id=${doc.id}&name-${data.name}">
        <div class="items__info">
            <h1 class="items__title">${data.name}</h1>
            <h3 class="items__price">${data.price}</h3>
            <h4 class="items__rate">${data.rate}</h4>
        </div>
        </a>
        <button class="hidden showLoggedAdmin" >delete</button>
        <button class="items__cartBtn" >Add to cart</button>
       `
       ;

        list.appendChild(items);

        const cartBtn = items.querySelector('.items__cartBtn');
        cartBtn.addEventListener('click', function () {
            cart.push(data);
            localStorage.setItem('store__cart', JSON.stringify(cart));
            cartBtnNumber.innerText = cart.length;
          /*addToMyCart({
            ...data,
            id: doc.id,
          });*/
          //localStorage.setItem('store__cart', JSON.stringify(cart));
        });
      });
    }


const filters = document.querySelector('.filters');

filters.addEventListener('change', function () {
    console.log(filters.price.value);
    console.log(filters.soft.value);

    let productCollection = db.collection('products');
    //Filtroooo de type 
    if (filters.type.value) {
        productCollection = productCollection.where('type', '==', filters.type.value)
    }

    if (filters.soft.value) {
        productCollection = productCollection.where('soft', '==', filters.soft.value)
    }


    //Filtroooo de precio
    if (filters.price.value) {
        switch (filters.price.value) {
            case '0': productCollection = productCollection.where('price', '<=', 1000)
                break;
            case '1': productCollection = productCollection.where('price', '>=', 1000).where('price', '<', 5000)
                break;
            case '2': productCollection = productCollection.where('price', '>=', 5000)
                break;
        }
    }

    //Ordenamiento 
    if (filters.order.value) {
        switch (filters.order.value) {
            case 'rate_asc': productCollection = productCollection.orderBy('rate', 'asc')
                break;
            case 'rate_desc': productCollection = productCollection.orderBy('rate', 'desc')
                break;
            case 'alpha': productCollection = productCollection.orderBy('name', 'asc')
                break;
            case 'createdAt': productCollection = productCollection.orderBy('createdAt', 'desc')
                break;
        }
    }


    productCollection.get().then(handleCollectionResult)


});

let productCollection = db.collection('products')
    .get()
    .then(handleCollectionResult)


