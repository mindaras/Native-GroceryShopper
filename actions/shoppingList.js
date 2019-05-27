import { request, endpoints } from "../common";
import { endShoppingListRefresh } from "./refresh";

export const GET_SHOPPING_LIST_ITEMS = "shoppingList_addItems";
export const ADD_ITEM_TO_SHOPPING_LIST = "shoppingList_addItem";
export const UPDATE_ITEM_IN_SHOPPING_LIST = "shoppingList_updateItem";
export const BOUGHT_ITEM = "shoppingList_boughtItem";
export const REMOVE_ITEM_FROM_SHOPPING_LIST = "shoppingList_removeItem";

export const getShoppingListItems = dispatch => async ({ refreshing }) => {
  try {
    const payload = await request(endpoints.shoppingList.getAll, "GET");

    if (!payload.message) {
      dispatch({ type: GET_SHOPPING_LIST_ITEMS, payload });
      if (refreshing) endShoppingListRefresh(dispatch);
    }
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
