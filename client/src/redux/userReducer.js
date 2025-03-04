const savedUser = JSON.parse(localStorage.getItem("user")) || null;
const savedToken = localStorage.getItem("token") || null;

const initialState = {
  user: savedUser,
  token: savedToken,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USER":
      localStorage.setItem("user", JSON.stringify(action.payload));
      localStorage.setItem("token", action.payload.token);
      
      return {
        ...state,
        user: action.payload,
      };

    case "LOGOUT_USER":
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      return {
        ...state,
        user: null,
      };

    default:
      return state;
  }
};

export default userReducer;
