
const items = [
    {
        img: "https://images-na.ssl-images-amazon.com/images/I/71MfPzyRUcL._AC_SX569_.jpg",
        title: 'Lorem Ipsum',
        price: 60000,

    },

    {
        img: "https://images-na.ssl-images-amazon.com/images/I/71MfPzyRUcL._AC_SX569_.jpg",
        title: 'Lorem Ipsum',
        price: 70000,

    },

    {
        img: "https://images-na.ssl-images-amazon.com/images/I/71MfPzyRUcL._AC_SX569_.jpg",
        title: 'Lorem Ipsum',
        price: 80000,

    },
];

const list = document.querySelector('.list');

function handleProductItem(item) {
    const items = document.createElement('a');
    items.innerHTML = `
    <img class="items__img"
    src="${item.img}">
<div class="items__info">
    <h1 class="items__title">
    ${item.title}
    </h1>
    <h3 class="items__price">
    ${item.price}
    </h3>
</div>
</a>
   `;

    items.classList.add('items');
    items.setAttribute('href','a');
    list.appendChild(items);

    console.log(items);
}

items.forEach(handleProductItem)

