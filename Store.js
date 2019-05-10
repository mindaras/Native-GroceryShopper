import React, { createContext, useReducer } from "react";
import shoppingList, {
  shoppingListInitialState
} from "./reducers/shoppingList";

const initialState = {
  products: {},
  shoppingList: shoppingListInitialState
};

const reducer = (state, action) => {
  const reducerType = action.type.split("_")[0];

  switch (reducerType) {
    case "shoppingList":
      return shoppingList(state, action);
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
