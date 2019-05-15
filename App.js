import React, { useContext, useEffect } from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";
import {
  Signin,
  ShoppingList,
  Products,
  ProductDetails,
  AddProduct
} from "./screens";
import SplashScreen from "react-native-splash-screen";
import Store, { StoreContext } from "./Store";

const MainNavigator = createStackNavigator({
  ShoppingList: { screen: ShoppingList },
  Products: { screen: Products },
  ProductDetails: { screen: ProductDetails },
  AddProduct: { screen: AddProduct }
});

const Navigator = createAppContainer(MainNavigator);

const Entry = () => {
  const { store } = useContext(StoreContext);
  const {
    auth: { authenticated }
  } = store;

  if (authenticated) {
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
