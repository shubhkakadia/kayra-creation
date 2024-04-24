import axios from "axios";
import { ALLPRODUCTS } from "../types";

export const getallproducts = (product) => (dispatch) => {
  dispatch(load());
  console.log("in all products");

  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${process.env.REACT_APP_API_URL}${product}/getall`,
    headers: {},
  };

  console.log(config.url);

  axios
    .request(config)
    .then((response) => {
      console.log(response.data);
      dispatch(success(response.data));
    })
    .catch((err) => {
      console.log(error);
      dispatch(error(err.response.data));
    });
};

export const load = () => ({
  type: ALLPRODUCTS.load,
});

export const success = (data) => ({
  type: ALLPRODUCTS.success,
  payload: data,
});

export const error = (error) => ({
  type: ALLPRODUCTS.error,
  payload: error,
});
