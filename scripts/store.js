const list = document.querySelector('.list');

db.collection('products')
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            const items = document.createElement('a');
            let img = data.images[0]?.url;
            if(!img){
                img='./img/placeholder.png';
            }
            items.innerHTML = `
            <img class="items__img" src="${img}">
            <div class="items__info">
                <h1 class="items__title">${data.name}</h1>
                <h3 class="items__price">${data.price}</h3>
            </div>
           `;
        
            items.classList.add('items');
            items.setAttribute('href', 'a');
            list.appendChild(items);

        });
    })


