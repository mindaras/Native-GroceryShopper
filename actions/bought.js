import { request, endpoints } from "../common";
import { REMOVE_ITEM_FROM_SHOPPING_LIST } from "./shoppingList";

export const GET_BOUGHT_PRODUCTS = "bought_getBoughtProducts";
export const ADD_ITEM_TO_BOUGHT = "bought_addItemToBought";

export const getBoughtProducts = dispatch => async payload => {
  try {
    const output = await request(endpoints.bought.get, "POST", payload);

    if (!output.message) {
      dispatch({ type: GET_BOUGHT_PRODUCTS, payload: output });
    }
  } catch (e) {}
};

export const boughtItem = dispatch => async payload => {
  try {
    const output = await request(endpoints.bought.create, "POST", payload);

    if (!output.message) {
      dispatch({ type: ADD_ITEM_TO_BOUGHT, payload });
      dispatch({ type: REMOVE_ITEM_FROM_SHOPPING_LIST, payload });
    }
  } catch (e) {}
};
