import { getShoppingListItems } from "./shoppingList";
import { getProducts } from "./products";

export const START_SHOPPING_LIST_REFRESH = "refresh_startShoppingListRefresh";
export const END_SHOPPING_LIST_REFRESH = "refresh_endShoppingListRefresh";
export const START_PRODUCTS_REFRESH = "refresh_startProductsRefresh";
export const END_PRODUCTS_REFRESH = "refresh_endProductsRefresh";

export const refreshShoppingList = dispatch => {
  dispatch({ type: START_SHOPPING_LIST_REFRESH });
  getShoppingListItems(dispatch);
};

export const endShoppingListRefresh = dispatch => {
  dispatch({ type: END_SHOPPING_LIST_REFRESH });
};

export const refreshProducts = dispatch => {
  dispatch({ type: START_PRODUCTS_REFRESH });
  getProducts(dispatch);
};

export const endProductsRefresh = dispatch => {
  dispatch({ type: END_PRODUCTS_REFRESH });
};
