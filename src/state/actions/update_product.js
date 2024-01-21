import axios from "axios";
import { UPDATE_PRODUCT } from "../types";


export const updateProduct = (product, productObj) => (dispatch) => {  
  dispatch(load());

  let config = {
    method: "put",
    maxBodyLength: Infinity,
    url: `http://127.0.0.1:5000/${product}/update/${productObj.productNo}`,
    headers: {
        "Content-Type": "application/json",
      },
    data: productObj,
  };

  axios
    .request(config)
    .then((response) => {
      console.log(response.data);
      dispatch(success(response.data));
    })
    .catch((err) => {
      console.log(err);
      dispatch(error(err.response.data));
    });
};

// export const clearUpdateProduct = () => (dispatch) => {
//   dispatch(success({}));
//   dispatch(error({}));
// }

export const load = () => ({
  type: UPDATE_PRODUCT.load,
});

export const success = (data) => ({
  type: UPDATE_PRODUCT.success,
  payload: data,
});

export const error = (error) => ({
  type: UPDATE_PRODUCT.error,
  payload: error,
});
