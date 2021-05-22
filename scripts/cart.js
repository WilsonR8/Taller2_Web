const list = document.querySelector('.cartList');

let total=0;

   cart.forEach((data) => {
        const items = document.createElement('div');
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
        
       `
       ;
        list.appendChild(items);

        total += data.price;

      });
    