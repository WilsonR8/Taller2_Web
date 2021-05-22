const list = document.querySelector('.cartList');
const listCheck = document.querySelector('.cartCheck');
const checkspan = document.querySelector('.cartchack__subtotal span')

let total=0;

renderCart = () => {
    cart.forEach((data) => {
      const items = document.createElement('div');
        let img = data.images[0]?.url;
        if (!img) {
            img = './img/placeholder.png';
        }
        items.classList.add('items');
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

    checkspan.innerText = total;

    }


