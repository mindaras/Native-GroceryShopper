import {
  ADD_ITEM_TO_PRODUCTS,
  UPDATE_ITEM_IN_PRODUCTS,
  REMOVE_ITEM_FROM_PRODUCTS
} from "../actions";

export const productsInitialState = {};

const add = (state, action) => {
  const { id, type, name, price } = action.payload;
  const newState = { ...state };

  if (!newState.products[type]) newState.products[type] = {};

  newState.products[type][id] = { id, type, name, price };

  return newState;
};

const update = (state, action) => {
  const { id, type, name, price } = action.payload;
  const newState = { ...state };
  newState.products[type][id] = { id, type, name, price };
  return newState;
};

const remove = (state, action) => {
  const { id, type } = action.payload;
  const newState = { ...state };
  delete newState.products[type][id];
  return newState;
};

export const products = (state, action) => {
  switch (action.type) {
    case ADD_ITEM_TO_PRODUCTS:
      return add(state, action);
    case UPDATE_ITEM_IN_PRODUCTS:
      return update(state, action);
    case REMOVE_ITEM_FROM_PRODUCTS:
      return remove(state, action);
    default:
      return state;
  }
};
