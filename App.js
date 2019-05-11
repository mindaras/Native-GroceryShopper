import React, { Component } from "react";
import { Text } from "react-native";
import { Signin, ShoppingList, Products } from "./screens";
import Store from "./Store";

class App extends Component {
  render() {
    return (
      <Store>
        <Products />
      </Store>
    );
  }
}

export default App;
