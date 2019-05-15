export const ADD_ITEM_TO_PRODUCTS = "products_addItem";
export const UPDATE_ITEM_IN_PRODUCTS = "products_updateItem";
export const REMOVE_ITEM_FROM_PRODUCTS = "products_removeItem";

export const addItemToProducts = dispatch => payload => {
  dispatch({ type: ADD_ITEM_TO_PRODUCTS, payload });
};

export const updateItemInProducts = dispatch => payload => {
  dispatch({ type: UPDATE_ITEM_IN_PRODUCTS, payload });
};

export const removeItemFromProducts = dispatch => payload => {
  dispatch({ type: REMOVE_ITEM_FROM_PRODUCTS, payload });
};
