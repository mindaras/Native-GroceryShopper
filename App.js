import React, { useContext, useEffect } from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";
import {
  Signin,
  ShoppingList,
  Products,
  ProductDetails,
  AddProduct,
  Statistics
} from "./screens";
import SplashScreen from "react-native-splash-screen";
import Store, { StoreContext } from "./Store";
import AsyncStorage from "@react-native-community/async-storage";
import { refreshSession } from "./actions";

const MainNavigator = createStackNavigator({
  ShoppingList: { screen: ShoppingList },
  Products: { screen: Products },
  ProductDetails: { screen: ProductDetails },
  AddProduct: { screen: AddProduct },
  Statistics: { screen: Statistics }
});

const Navigator = createAppContainer(MainNavigator);

const Entry = () => {
  const { store, dispatch } = useContext(StoreContext);

  useEffect(() => {
    const tryToRefreshSession = async () => {
      try {
        const username = await AsyncStorage.getItem("GroceryShopper_username");

        if (username) {
          const refreshToken = await AsyncStorage.getItem(
            "GroceryShopper_refreshToken"
          );

          refreshSession(dispatch)({ username, token: refreshToken });
        }
      } catch (e) {}
    };

    tryToRefreshSession();
  }, []);

  if (store.auth.authenticated) {
    return <Navigator />;
  }

  return <Signin />;
};

const App = () => {
  useEffect(() => SplashScreen.hide(), []);

  return (
    <Store>
      <Entry />
    </Store>
  );
};

export default App;
