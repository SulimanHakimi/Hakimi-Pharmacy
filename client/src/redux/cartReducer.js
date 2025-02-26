// cartReducer.js

const initialState = {
    items: [],
  };
  
  const cartReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'ADD_ITEM_TO_CART':
        return {
          ...state,
          items: [...state.items, action.payload],
        };
      case 'REMOVE_ITEM_FROM_CART':
        return {
          ...state,
          items: state.items.filter((item) => item.id !== action.payload),
        };
      case 'CLEAR_CART':
        return {
          ...state,
          items: [],
        };
      default:
        return state;
    }
  };
  
  export default cartReducer;
  