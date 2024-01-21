import { UPDATE_PRODUCT } from "../types";

const initialState = {
  load: false,
  data: "",
  error: "",
};

export const updateproductreducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_PRODUCT.load:
      return {
        ...state,
        load: true,
      };
    case UPDATE_PRODUCT.success:
      return {
        ...state,
        data: action.payload,
        load: false,
      };
    case UPDATE_PRODUCT.error:
      return {
        ...state,
        error: action.payload,
        load: false,
      };
    default:
      return state;
  }
};
