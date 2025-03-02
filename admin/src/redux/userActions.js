export const setUser = (user, token) => {
  return {
    type: "SET_USER",
    payload: { user, token },
  };
};

export const logoutUser = () => {
  return {
    type: "LOGOUT_USER",
  };
};
