const list = document.querySelector('.list');

const handleCollectionResult = (querySnapshot) => {
    list.innerHTML = '';
    querySnapshot.forEach((doc) => {
        const data = doc.data();
        const items = document.createElement('a');
        let img = data.images[0]?.url;
        if (!img) {
            img = './img/placeholder.png';
        }
        items.innerHTML = `
        <img class="items__img" src="${img}">
        <div class="items__info">
            <h1 class="items__title">${data.name}</h1>
            <h3 class="items__price">${data.price}</h3>
            <h4 class="items__rate">${data.rate}</h4>
        </div>
       `;

        items.classList.add('items');
        items.setAttribute('href', 'a');

        list.appendChild(items);

    });
}



const filters = document.querySelector('.filters');

filters.addEventListener('change', function () {
    console.log(filters.price.value);

    let productCollection = db.collection('products');
    //Filtroooo de type 
    if (filters.type.value) {
        productCollection = productCollection.where('type', '==', filters.type.value)
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

    


    productCollection.get().then(handleCollectionResult)


});




db.collection('products')
    .get()
    .then(handleCollectionResult)


