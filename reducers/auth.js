import AsyncStorage from "@react-native-community/async-storage";
import { SIGNIN, SIGNOUT } from "../actions";

export const authInitialState = {
  username: "",
  idToken: "",
  refreshToken: "",
  error: "",
  authenticated: false
};

const signin = (state, action) => {
  const { message, username, idToken, refreshToken } = action.payload;

  if (message) {
    return { ...state, auth: { error: message } };
  }

  return {
    ...state,
    auth: { username, idToken, refreshToken, error: "", authenticated: true }
  };
};

const cleanStorage = async () => {
  try {
    await AsyncStorage.removeItem("GroceryShopper_username");
    await AsyncStorage.removeItem("GroceryShopper_refreshToken");
  } catch (e) {}
};

const signout = state => {
  cleanStorage();

  return {
    ...state,
    auth: { username: "", idToken: "", refreshToken: "", authenticated: false }
  };
};

export const auth = (state, action) => {
  switch (action.type) {
    case SIGNIN:
      return signin(state, action);
    case SIGNOUT:
      return signout(state);
    default:
      return state;
  }
};
