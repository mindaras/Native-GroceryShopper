import React, { Component } from "react";
import { Text } from "react-native";
import { Signin, ShoppingList } from "./screens";
import Store from "./Store";

class App extends Component {
  render() {
    return (
      <Store>
        <ShoppingList />
      </Store>
    );
  }
}

export default App;
