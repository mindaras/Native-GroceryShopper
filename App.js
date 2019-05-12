import React, { Component } from "react";
import { Text } from "react-native";
import {
  Signin,
  ShoppingList,
  Products,
  ProductDetails,
  AddProduct
} from "./screens";
import Store from "./Store";

class App extends Component {
  render() {
    return (
      <Store>
        <AddProduct />
      </Store>
    );
  }
}

export default App;
