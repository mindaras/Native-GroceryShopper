import {
  ADD_ITEM_TO_SHOPPING_LIST,
  UPDATE_ITEM_IN_SHOPPING_LIST,
  BOUGHT_ITEM,
  REMOVE_ITEM_FROM_SHOPPING_LIST
} from "../actions";

export const shoppingListInitialState = {};

const add = (state, action) => {
  const { id, name, price, type } = action.payload;
  const newState = { ...state };
  newState.shoppingList[id] = { id, name, price, type };
  return newState;
};

const update = (state, action) => {
  const { id, name, price, type } = action.payload;
  const newState = { ...state };
  newState.shoppingList[id] = { id, name, price, type };
  return newState;
};

const bought = (state, action) => {
  const newState = { ...state };
  delete newState.shoppingList[action.payload.id];
  return newState;
};

const remove = (state, action) => {
  const newState = { ...state };
  delete newState.shoppingList[action.payload.id];
  return newState;
};

export const shoppingList = (state, action) => {
  switch (action.type) {
    case ADD_ITEM_TO_SHOPPING_LIST:
      return add(state, action);
    case UPDATE_ITEM_IN_SHOPPING_LIST:
      return update(state, action);
    case BOUGHT_ITEM:
      return bought(state, action);
    case REMOVE_ITEM_FROM_SHOPPING_LIST:
      return remove(state, action);
    default:
      return state;
  }
};
