function solve() {
    const cart = {};
    const textArea = document.querySelector('textarea');
    const shoppingCart = document.querySelector('.shopping-cart');
    shoppingCart.addEventListener('click', shopping);

    function shopping(event) {
        if (event.target.classList.contains('add-product')) {
            addProduct(event.target.parentNode.parentNode);
        } else if (event.target.classList.contains('checkout')) {
            checkout();
        } else {
            console.log('something else is clicked')
        }
    }

    function addProduct(product) {
        const name = product.children[1].firstElementChild.textContent;
        const price = Number(product.lastElementChild.textContent);
        if (cart[name]) {
            cart[name] += price;
        } else {
            cart[name] = price;
        }
        textArea.textContent += `Added ${name} for ${price.toFixed(2)} to the cart.\n`
    }

    function checkout() {
        shoppingCart.removeEventListener('click', shopping);
        const list = Object.keys(cart).join(', ');
        const totalPrice = Object.values(cart).reduce((sum, price) => sum += price, 0);
        textArea.textContent += `You bought ${list} for ${totalPrice.toFixed(2)}.`
    }
}