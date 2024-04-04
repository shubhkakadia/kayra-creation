import { combineReducers } from "redux";
import { searchToggleReducer } from "./searchToggle";
import { selectedShopReducer } from "./selected_shop";
import { adminLoginReducer } from "./admin_login";
import { allproductsReducer } from "./all_products";
import { updateproductreducer } from "./update_product";
import { selectedProductReducer } from "./selected_product";

const reducers = combineReducers({
  searchToggle: searchToggleReducer,
  selectedShop: selectedShopReducer,
  loggedInAdmin: adminLoginReducer,
  allproducts: allproductsReducer,
  updateProduct: updateproductreducer,
  selectedProduct: selectedProductReducer,
});

export default reducers;
