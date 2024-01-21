import { SELECTED_SHOP } from "../types";

const initialState = {
    selected: "None",
};

export const selectedShopReducer = (state = initialState, action) => {
  switch (action.type) {
    case SELECTED_SHOP.selected:
      return {
        ...state,
        selected: action.payload,
      };
    default:
      return state;
  }
};
