import { GET_BOUGHT_PRODUCTS, ADD_ITEM_TO_BOUGHT } from "../actions";

export const boughtInitialState = [];

const addBoughtProducts = (state, action) => {
  return { ...state, bought: action.payload };
};

const addItemToBought = (state, action) => {
  const { price, type } = action.payload;
  return { ...state, bought: [...state.bought, { price, type }] };
};

export const bought = (state, action) => {
  switch (action.type) {
    case GET_BOUGHT_PRODUCTS:
      return addBoughtProducts(state, action);
    case ADD_ITEM_TO_BOUGHT:
      return addItemToBought(state, action);
    default:
      return state;
  }
};
