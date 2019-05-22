import { request, endpoints } from "../common";

export const ADD_ITEMS_TO_PRODUCTS = "products_addItems";
export const ADD_ITEM_TO_PRODUCTS = "products_addItem";
export const UPDATE_ITEM_IN_PRODUCTS = "products_updateItem";
export const REMOVE_ITEM_FROM_PRODUCTS = "products_removeItem";

export const getProducts = async dispatch => {
  try {
    const payload = await request(endpoints.products.getAll, "GET");
    if (!payload.message) dispatch({ type: ADD_ITEMS_TO_PRODUCTS, payload });
  } catch (e) {}
};

export const addItemToProducts = dispatch => async payload => {
  try {
    const output = await request(endpoints.products.create, "POST", payload);

    if (!output.message) {
      dispatch({
        type: ADD_ITEM_TO_PRODUCTS,
        payload: { ...payload, id: output.id }
      });
    }
  } catch (e) {}
};

export const updateItemInProducts = dispatch => async payload => {
  try {
    const output = await request(endpoints.products.update, "PUT", payload);

    if (!output.message) {
      dispatch({ type: UPDATE_ITEM_IN_PRODUCTS, payload });
    }
  } catch (e) {}
};

export const removeItemFromProducts = dispatch => async payload => {
  try {
    const output = await request(endpoints.products.delete, "DELETE", payload);
    if (!output.message) dispatch({ type: REMOVE_ITEM_FROM_PRODUCTS, payload });
  } catch (e) {}
};
