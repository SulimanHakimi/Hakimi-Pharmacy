export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const UPDATE_CART = "UPDATE_CART";
export const CLEAR_CART = "CLEAR_CART";

export const addToCart = (product) => ({
  type: ADD_TO_CART,
  payload: product,
});

export const removeFromCart = (productId) => ({
  type: REMOVE_FROM_CART,
  payload: productId,
});

export const updateCart = (cartItems) => ({
  type: UPDATE_CART,
  payload: cartItems,
});

export const clearCart = () => ({
  type: CLEAR_CART,
});
