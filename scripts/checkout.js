const checkoutForm = document.querySelector('.checkout__form');

checkoutForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const producIds = [];
    cart.forEach(function (data) {
        producIds.push(data.id);
    });


    const order = {
        fname: checkoutForm.fname.value,
        email: checkoutForm.email.value,
        country: checkoutForm.country.value,
        ccNumber: checkoutForm.ccnumber.value,
        cvc: checkoutForm.cvc.value,
        expires: checkoutForm.expires.value,
        date: Date.now(),
        producIds: producIds,
       // total: total,
        uid: loggedUser.uid,
    };

    ORDERS_COLLECTION.add(order)
        .then(function (docRef) {
            console.log(docRef.id);

            CART_COLLECTION.doc(loggedUser.uid).set({
                cart: [],
            });

            location.href = '/index.html';
        });

    console.log(order)
});

