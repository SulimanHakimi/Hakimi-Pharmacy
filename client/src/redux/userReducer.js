const savedUser = JSON.parse(localStorage.getItem("user")) || null;
const initialState = {
  user: savedUser,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USER":
      localStorage.setItem("user", JSON.stringify(action.payload));
      return {
        ...state,
        user: action.payload,
      };

    case "LOGOUT_USER":
      localStorage.removeItem("user");
      return {
        ...state,
        user: null,
      };

    default:
      return state;
  }
};

export default userReducer;
