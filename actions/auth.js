export const SIGNUP = "auth_signup";
export const SIGNIN = "auth_signin";
export const SIGNOUT = "auth_signout";

export const signUp = dispatch => payload => {
  dispatch({ type: SIGNUP, payload });
};

export const signIn = dispatch => payload => {
  dispatch({ type: SIGNIN, payload });
};

export const signOut = dispatch => payload => {
  dispatch({ type: SIGNOUT, payload });
};
