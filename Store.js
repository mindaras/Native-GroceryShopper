import React, { createContext, useReducer } from "react";
import {
  products,
  productsInitialState,
  shoppingList,
  shoppingListInitialState,
  auth,
  authInitialState,
  refresh,
  refreshInitialState,
  bought,
  boughtInitialState,
  spendingBudget,
  spendingBudgetInitialState
} from "./reducers";

const initialState = {
  products: productsInitialState,
  shoppingList: shoppingListInitialState,
  auth: authInitialState,
  refresh: refreshInitialState,
  bought: boughtInitialState,
  spendingBudget: spendingBudgetInitialState
};

const reducer = (state, action) => {
  const reducerType = action.type.split("_")[0];

  switch (reducerType) {
    case "shoppingList":
      return shoppingList(state, action);
    case "products":
      return products(state, action);
    case "auth":
      return auth(state, action);
    case "refresh":
      return refresh(state, action);
    case "bought":
      return bought(state, action);
    case "spendingBudget":
      return spendingBudget(state, action);
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
