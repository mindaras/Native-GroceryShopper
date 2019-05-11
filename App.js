import React, { Component } from "react";
import { Text } from "react-native";
import { Signin, ShoppingList, Products, ProductDetails } from "./screens";
import Store from "./Store";

class App extends Component {
  render() {
    return (
      <Store>
        <ProductDetails />
      </Store>
    );
  }
}

export default App;
