import { request, endpoints } from "../common";

export const UPDATE_SPENDING_BUDGET = "spendingBudget_update";
export const TOP_UP_SPENDING_BUDGET = "spendingBudget_topUp";
export const WITHDRAW_FROM_SPENDING_BUDGET = "spendingBudget_withdraw";

export const getSpendingBudget = dispatch => async payload => {
  try {
    const output = await request(endpoints.spendingBudget.get, "POST", payload);

    if (!output.message) {
      dispatch({ type: UPDATE_SPENDING_BUDGET, payload: output });
    }
  } catch (e) {}
};

export const topUpSpendingBudget = dispatch => async payload => {
  try {
    const output = await request(
      endpoints.spendingBudget.topUp,
      "PUT",
      payload
    );

    if (!output.message) {
      dispatch({ type: TOP_UP_SPENDING_BUDGET, payload });
    }
  } catch (e) {}
};

export const withdrawFromSpendingBudget = dispatch => async payload => {
  try {
    const output = await request(
      endpoints.spendingBudget.withdraw,
      "PUT",
      payload
    );

    if (!output.message) {
      dispatch({ type: WITHDRAW_FROM_SPENDING_BUDGET, payload });
    }
  } catch (e) {}
};
