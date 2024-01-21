import { combineReducers } from "redux";
import { searchToggleReducer } from "./searchToggle";
import { selectedShopReducer } from "./selected_shop";
import { adminLoginReducer } from "./admin_login";
import { allproductsReducer } from "./all_products";
import { updateproductreducer } from "./update_product";

const reducers = combineReducers({
    searchToggle: searchToggleReducer,
    selectedShop: selectedShopReducer,
    loggedInAdmin: adminLoginReducer,
    allproducts: allproductsReducer,
    updateProduct: updateproductreducer,
})

export default reducers