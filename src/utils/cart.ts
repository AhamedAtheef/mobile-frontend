const CART_KEY = "cartItems";

export const getCart = () => JSON.parse(localStorage.getItem(CART_KEY) || "[]");
export const saveCart = (cart) => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));

    // ✅ notify all components that cart changed
    window.dispatchEvent(new Event("cartUpdated"));
};

export const addToCart = (product, qty = 1) => {
    const cart = getCart();
    const exist = cart.find((i) => i.productid === product.productid);

    if (exist) {
        exist.quantity += qty;
    } else {
        cart.push({
            ...product,
            quantity: qty,
            image: Array.isArray(product.image) ? product.image[0] : product.image,
        });
    }

    saveCart(cart);
};

export const removeFromCart = (id) => {
    saveCart(getCart().filter((i) => i.productid !== id));
};

export const updateQty = (id, qty) => {
    const cart = getCart().map((i) =>
        i.productid === id ? { ...i, quantity: qty } : i
    );
    saveCart(cart);
};

export const clearCart = () => {
    localStorage.removeItem(CART_KEY);
    window.dispatchEvent(new Event("cartUpdated")); // ✅ also notify
};
