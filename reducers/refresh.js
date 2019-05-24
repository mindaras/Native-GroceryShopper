import {
  START_SHOPPING_LIST_REFRESH,
  END_SHOPPING_LIST_REFRESH,
  START_PRODUCTS_REFRESH,
  END_PRODUCTS_REFRESH
} from "../actions";

export const refreshInitialState = { shoppingList: false, products: false };

const startRefresh = (state, key) => {
  return { ...state, refresh: { ...state.refresh, [key]: true } };
};

const endRefresh = (state, key) => {
  return { ...state, refresh: { ...state.refresh, [key]: false } };
};

export const refresh = (state, action) => {
  switch (action.type) {
    case START_SHOPPING_LIST_REFRESH:
      return startRefresh(state, "shoppingList");
    case END_SHOPPING_LIST_REFRESH:
      return endRefresh(state, "shoppingList");
    case START_PRODUCTS_REFRESH:
      return startRefresh(state, "products");
    case END_PRODUCTS_REFRESH:
      return endRefresh(state, "products");
    default:
      return state;
  }
};
