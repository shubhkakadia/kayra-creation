import { SELECTED_PRODUCT } from "../types";

const initialState = {
    selected: "None",
};

export const selectedProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case SELECTED_PRODUCT.selected:
      return {
        ...state,
        selected: action.payload,
      };
    default:
      return state;
  }
};
