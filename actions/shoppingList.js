export const ADD_ITEM_TO_SHOPPING_LIST = "shoppingList_addItem";
export const UPDATE_ITEM_IN_SHOPPING_LIST = "shoppingList_updateItem";
export const BOUGHT_ITEM = "shoppingList_boughtItem";
export const REMOVE_ITEM_FROM_SHOPPING_LIST = "shoppingList_removeItem";

export const addItemToShoppingList = dispatch => payload => {
  dispatch({ type: ADD_ITEM_TO_SHOPPING_LIST, payload });
};

export const updateItemInShoppingList = dispatch => payload => {
  dispatch({ type: UPDATE_ITEM_IN_SHOPPING_LIST, payload });
};

export const boughtItem = dispatch => payload => {
  dispatch({ type: BOUGHT_ITEM, payload });
};

export const removeItemFromShoppingList = dispatch => payload => {
  dispatch({ type: BOUGHT_ITEM, payload });
};
