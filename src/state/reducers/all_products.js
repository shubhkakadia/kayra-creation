import { ALLPRODUCTS } from "../types";

const initialState = {
  load: false,
  data: {},
  error: {},
};

export const allproductsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ALLPRODUCTS.load:
      return {
        ...state,
        load: true,
      };
    case ALLPRODUCTS.success:
      return {
        ...state,
        data: action.payload,
        load: false,
      };
    case ALLPRODUCTS.error:
      return {
        ...state,
        error: action.payload,
        load: false,
      };
    default:
      return state;
  }
};
