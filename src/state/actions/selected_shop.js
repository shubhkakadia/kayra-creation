import { SELECTED_SHOP } from "../types";

export const setSelectedShop = (category) => (dispatch) => {
  dispatch(selected(category));
};

export const selected = (value) => ({
  type: SELECTED_SHOP.selected,
  payload: value,
});
