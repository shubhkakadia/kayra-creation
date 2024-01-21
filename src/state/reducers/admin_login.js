import { ADMIN } from "../types";

const initialState = {
  load: false,
  data: "",
  error: "",
};

export const adminLoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADMIN.load:
      return {
        ...state,
        load: true,
      };
    case ADMIN.success:
      return {
        ...state,
        data: action.payload,
        load: false,
      };
    case ADMIN.error:
      return {
        ...state,
        error: action.payload,
        load: false,
      };
    default:
      return state;
  }
};
