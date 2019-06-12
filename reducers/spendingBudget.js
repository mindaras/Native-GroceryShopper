import {
  UPDATE_SPENDING_BUDGET,
  TOP_UP_SPENDING_BUDGET,
  WITHDRAW_FROM_SPENDING_BUDGET
} from "../actions";

export const spendingBudgetInitialState = 0;

const update = (state, action) => {
  return { ...state, spendingBudget: action.payload.amount };
};

const topUp = (state, action) => {
  return {
    ...state,
    spendingBudget: state.spendingBudget + action.payload.amount
  };
};

const withdraw = (state, action) => {
  return {
    ...state,
    spendingBudget: state.spendingBudget - action.payload.amount
  };
};

export const spendingBudget = (state, action) => {
  switch (action.type) {
    case UPDATE_SPENDING_BUDGET:
      return update(state, action);
    case TOP_UP_SPENDING_BUDGET:
      return topUp(state, action);
    case WITHDRAW_FROM_SPENDING_BUDGET:
      return withdraw(state, action);
    default:
      return state;
  }
};
