import { request, endpoints } from "../common";
import AsyncStorage from "@react-native-community/async-storage";

export const SIGNIN = "auth_signin";
export const REFRESH_SESSION = "auth_refreshSession";
export const SIGNOUT = "auth_signout";

export const signIn = dispatch => async ({ username, password }) => {
  try {
    const payload = await request(endpoints.auth.signin, "POST", {
      username,
      password
    });

    if (payload.message) {
      dispatch({ type: SIGNIN, payload: { message: payload.message } });
      return;
    }

    dispatch({ type: SIGNIN, payload });

    try {
      const { username, idToken, refreshToken } = payload;

      if (idToken && refreshToken) {
        await AsyncStorage.setItem("GroceryShopper_username", username);
        await AsyncStorage.setItem("GroceryShopper_refreshToken", refreshToken);
      }
    } catch (e) {}
  } catch (e) {}
};

export const refreshSession = dispatch => async ({ username, token }) => {
  try {
    const payload = await request(endpoints.auth.refreshSession, "POST", {
      username,
      token
    });

    if (!payload.message) {
      const { idToken, refreshToken } = payload;

      dispatch({ type: SIGNIN, payload: { username, idToken, refreshToken } });

      await AsyncStorage.setItem("GroceryShopper_idToken", idToken);
      await AsyncStorage.setItem("GroceryShopper_refreshToken", refreshToken);
    }
  } catch (e) {}
};

export const signOut = dispatch => payload => {
  dispatch({ type: SIGNOUT, payload });
};
