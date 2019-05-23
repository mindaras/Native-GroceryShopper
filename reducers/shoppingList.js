import {
  ADD_ITEMS_SHOPPING_LIST,
  ADD_ITEM_TO_SHOPPING_LIST,
  UPDATE_ITEM_IN_SHOPPING_LIST,
  BOUGHT_ITEM,
  REMOVE_ITEM_FROM_SHOPPING_LIST
} from "../actions";

export const shoppingListInitialState = [];

const addItems = (state, action) => {
  const shoppingList = action.payload.reduce((acc, curr) => {
    acc[curr.id] = curr;
    return acc;
  }, {});

  return { ...state, shoppingList };
};

const add = (state, action) => {
  const { id, productId, name, price, type } = action.payload;
  const shoppingList = {
    ...state.shoppingList,
    [id]: { id, productId, name, price, type }
  };

  return { ...state, shoppingList };
};

const update = (state, action) => {
  const { name, price, type, keys } = action.payload;
  const shoppingList = { ...state.shoppingList };

  keys.forEach(({ id }) => {
    shoppingList[id] = { ...shoppingList[id], name, price, type };
  });

  return { ...state, shoppingList };
};

const remove = (state, action) => {
  const newState = { ...state };
  delete newState.shoppingList[action.payload.id];
  return newState;
};

export const shoppingList = (state, action) => {
  switch (action.type) {
    case ADD_ITEMS_SHOPPING_LIST:
      return addItems(state, action);
    case ADD_ITEM_TO_SHOPPING_LIST:
      return add(state, action);
    case UPDATE_ITEM_IN_SHOPPING_LIST:
      return update(state, action);
    case BOUGHT_ITEM:
    case REMOVE_ITEM_FROM_SHOPPING_LIST:
      return remove(state, action);
    default:
      return state;
  }
};
