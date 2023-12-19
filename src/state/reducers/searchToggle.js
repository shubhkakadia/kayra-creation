import { SEARCH_TOGGLE } from "../types";

const initialState = {
    toggle: false,
};

export const searchToggleReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_TOGGLE.toggle:
      return {
        ...state,
        toggle: action.payload,
      };
    default:
      return state;
  }
};
