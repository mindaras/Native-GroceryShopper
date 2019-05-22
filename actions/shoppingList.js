import { request, endpoints } from "../common";

export const ADD_ITEMS_SHOPPING_LIST = "shoppingList_addItems";
export const ADD_ITEM_TO_SHOPPING_LIST = "shoppingList_addItem";
export const UPDATE_ITEM_IN_SHOPPING_LIST = "shoppingList_updateItem";
export const BOUGHT_ITEM = "shoppingList_boughtItem";
export const REMOVE_ITEM_FROM_SHOPPING_LIST = "shoppingList_removeItem";

export const getShoppingListItems = async dispatch => {
  try {
    const payload = await request(endpoints.shoppingList.getAll, "GET");
    if (!payload.message) dispatch({ type: ADD_ITEMS_SHOPPING_LIST, payload });
  } catch (e) {}
};

export const addItemToShoppingList = dispatch => async payload => {
  try {
    // console.log("input", payload);
    // const payload = await request(
    //   endpoints.shoppingList.create,
    //   "POST",
    //   payload
    // );
    // console.log("payload", payload);
    dispatch({ type: ADD_ITEM_TO_SHOPPING_LIST, payload });
  } catch (e) {}
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
