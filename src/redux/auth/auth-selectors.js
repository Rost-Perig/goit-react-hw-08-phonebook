const getIsLoggedIn = state => state.auth.isLoggedIn;
const getUsername = state => state.auth.user.name;
const getBadRequest = state => state.auth.badRequest;

export const authSelectors = {
  getIsLoggedIn,
  getUsername,
  getBadRequest
};
