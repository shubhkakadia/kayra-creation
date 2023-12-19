import { SEARCH_TOGGLE } from "../types";

export const setSearchToggle = (factory) => (dispatch) => {
  dispatch(toggle(factory));
};

export const toggle = (value) => ({
  type: SEARCH_TOGGLE.toggle,
  payload: value,
});
