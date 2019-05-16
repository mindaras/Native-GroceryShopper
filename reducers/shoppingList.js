import {
  ADD_ITEM_TO_SHOPPING_LIST,
  UPDATE_ITEM_IN_SHOPPING_LIST,
  BOUGHT_ITEM,
  REMOVE_ITEM_FROM_SHOPPING_LIST
} from "../actions";

export const shoppingListInitialState = [];

const add = (state, action) => {
  const { id, name, price, type } = action.payload;
  const shoppingList = [...state.shoppingList, { id, name, price, type }];

  return { ...state, shoppingList };
};

const update = (state, action) => {
  const { id, name, price, type } = action.payload;
  const shoppingList = state.shoppingList.map(item => {
    if (item.id === id) {
      return { id, name, price, type };
    }

    return item;
  });

  return { ...state, shoppingList };
};

const bought = (state, action) => {
  const shoppingList = state.shoppingList.filter((item, i) => {
    return i !== action.payload.index;
  });

  return {
    ...state,
    shoppingList
  };
};

const remove = (state, action) => {
  const shoppingList = state.shoppingList.filter((item, i) => {
    return i !== action.payload.index;
  });

  return { ...state, shoppingList };
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
