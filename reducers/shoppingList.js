import { REMOVE_ITEM_FROM_SHOPPING_LIST } from "../actionTypes";

export const shoppingListInitialState = {
  "3202340sdf": {
    name: "Salad",
    price: "2.59",
    type: "greens"
  },
  "3202df40sdf": {
    name: "Chicken",
    price: "2.59",
    type: "meat"
  },
  "3232402340sdf": {
    name: "Coca Cola",
    price: "2.59",
    type: "sweets"
  },
  "32023sdf40sdf": {
    name: "Orange",
    price: "2.59",
    type: "fruits"
  }
};

export default (state = {}, action) => {
  switch (action.type) {
    case REMOVE_ITEM_FROM_SHOPPING_LIST:
      const newState = { ...state };
      delete newState.shoppingList[action.id];
      return newState;
    default:
      return state;
  }
};
