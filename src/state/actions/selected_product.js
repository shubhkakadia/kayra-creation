import { SELECTED_PRODUCT } from "../types";

export const setSelectedProduct = (product) => (dispatch) => {
  dispatch(selected(product));
};

export const selected = (value) => ({
  type: SELECTED_PRODUCT.selected,
  payload: value,
});
