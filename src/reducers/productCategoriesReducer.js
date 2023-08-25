import { SET_PRODUCT_CATEGORIES } from "../actionTypes/actionTypes";

const initialState = {
  productCategories: [],
};

const productCategoriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCT_CATEGORIES:
      return {
        ...state,
        productCategories: action.payload.productCategories,
      };

    default:
      return state;
  }
};
export default productCategoriesReducer;
