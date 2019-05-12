import { SIGNIN } from "../dispatchTypes";

export const authInitialState = {
  authenticated: false
};

export const auth = (state, action) => {
  switch (action.type) {
    case SIGNIN:
      return { ...state, auth: { authenticated: true } };
    default:
      return state;
  }
};
