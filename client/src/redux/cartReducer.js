import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  UPDATE_CART,
  CLEAR_CART,
} from "./cartActions";

const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
const initialState = {
  cartItems: savedCart,
};

const cartReducer = (state = initialState, action) => {
  let updatedCart;
  switch (action.type) {
    case ADD_TO_CART:
      const product = action.payload;
      const productExists = state.cartItems.find(
        (item) => item._id === product._id
      );

      if (productExists) {
        updatedCart = state.cartItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        updatedCart = [...state.cartItems, { ...product, quantity: 1 }];
      }

      localStorage.setItem("cart", JSON.stringify(updatedCart));

      return {
        ...state,
        cartItems: updatedCart,
      };

    case REMOVE_FROM_CART:
      updatedCart = state.cartItems.filter(
        (item) => item._id !== action.payload
      );

      localStorage.setItem("cart", JSON.stringify(updatedCart));

      return {
        ...state,
        cartItems: updatedCart,
      };

    case UPDATE_CART:
      updatedCart = action.payload;

      localStorage.setItem("cart", JSON.stringify(updatedCart));

      return {
        ...state,
        cartItems: updatedCart,
      };
    case CLEAR_CART:
      localStorage.removeItem("cart", JSON.stringify(updatedCart));
      return {
        ...state,
        cartItems: [],
      };
    default:
      return state;
  }
};

export default cartReducer;
