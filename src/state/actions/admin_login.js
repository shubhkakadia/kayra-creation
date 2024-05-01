import axios from "axios";
import { ADMIN } from "../types";
import Cookies from "universal-cookie";
const cookies = new Cookies();

export const adminLogin = (admin) => (dispatch) => {
  console.log("object")
  dispatch(load());
  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `${process.env.REACT_APP_API_URL}admin/login`,
    headers: {
      "Content-Type": "application/json",
    },
    data: admin,
  };

  axios
    .request(config)
    .then((response) => {
      if (response.data.token !== undefined) {
        cookies.set("ADMIN_TOKEN", response.data.token, {
          path: "/",
        });
        console.log(response.data);
        dispatch(success(response.data.admin));
      } else {
        dispatch(error("token_undefined"));
      }
    })
    .catch((err) => {
      console.log(err);
      dispatch(error(err.response.data));
    });
};

export const adminLogOut = () => (dispatch) => {
  dispatch(success({}));
  dispatch(error({}));
  console.log("admin logout")
  cookies.remove("ADMIN_TOKEN", { path: "/" });
};

export const load = () => ({
  type: ADMIN.load,
});

export const success = (data) => ({
  type: ADMIN.success,
  payload: data,
});

export const error = (error) => ({
  type: ADMIN.error,
  payload: error,
});
