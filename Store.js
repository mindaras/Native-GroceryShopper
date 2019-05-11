import React, { createContext, useReducer } from "react";
import {
  products,
  productsInitialState,
  shoppingList,
  shoppingListInitialState
} from "./reducers";

const initialState = {
  products: productsInitialState,
  shoppingList: shoppingListInitialState
};

const reducer = (state, action) => {
  const reducerType = action.type.split("_")[0];

  switch (reducerType) {
    case "shoppingList":
      return shoppingList(state, action);
    case "products":
      return products(state, action);
    default:
      return state;
  }
};

export const StoreContext = createContext(initialState);

const Store = ({ children }) => {
  const [store, dispatch] = useReducer(reducer, initialState);

  return (
    <StoreContext.Provider value={{ store, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};

export default Store;
