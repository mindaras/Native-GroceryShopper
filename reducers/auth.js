import { SIGNIN, SIGNOUT } from "../actions";

export const authInitialState = {
  authenticated: false
};

export const auth = (state, action) => {
  switch (action.type) {
    case SIGNIN:
      return { ...state, auth: { authenticated: true } };
    case SIGNOUT:
      return { ...state, auth: { authenticated: false } };
    default:
      return state;
  }
};
