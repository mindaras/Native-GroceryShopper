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
    const output = await request(
      endpoints.shoppingList.create,
      "POST",
      payload
    );

    if (!output.message) {
      dispatch({
        type: ADD_ITEM_TO_SHOPPING_LIST,
        payload: { ...payload, id: output.id }
      });
    }
  } catch (e) {}
};

export const updateItemInShoppingList = dispatch => async payload => {
  try {
    const output = await request(endpoints.shoppingList.update, "PUT", payload);

    if (!output.message) {
      dispatch({ type: UPDATE_ITEM_IN_SHOPPING_LIST, payload });
    }
  } catch (e) {}
};

export const boughtItem = dispatch => async payload => {
  try {
    const output = await request(endpoints.bought.create, "POST", payload);
    if (!output.message) dispatch({ type: BOUGHT_ITEM, payload });
  } catch (e) {}
};

export const removeItemFromShoppingList = dispatch => async payload => {
  try {
    const output = await request(
      endpoints.shoppingList.delete,
      "DELETE",
      payload
    );

    if (!output.message) {
      dispatch({ type: REMOVE_ITEM_FROM_SHOPPING_LIST, payload });
    }
  } catch (e) {}
};
