import { SEARCH_TOGGLE } from "../types";

export const setSearchToggle = (search) => (dispatch) => {
  dispatch(toggle(search));
};

export const toggle = (value) => ({
  type: SEARCH_TOGGLE.toggle,
  payload: value,
});
