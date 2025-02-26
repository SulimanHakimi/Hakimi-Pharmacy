// cartActions.js

export const addItemToCart = (item) => {
    return {
      type: 'ADD_ITEM_TO_CART',
      payload: item,
    };
  };
  
  export const removeItemFromCart = (itemId) => {
    return {
      type: 'REMOVE_ITEM_FROM_CART',
      payload: itemId,
    };
  };
  
  export const clearCart = () => {
    return {
      type: 'CLEAR_CART',
    };
  };
  