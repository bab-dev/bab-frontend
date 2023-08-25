import { SET_PRODUCT_CATEGORIES } from "../actionTypes/actionTypes";
import { variables } from "variables";

const setProductCategories = (productCategories) => {
  return {
    type: SET_PRODUCT_CATEGORIES,
    payload: {
      productCategories: productCategories,
    },
  };
};

const getProductCategories = () => {
  return async (dispatch) => {
    try {
      let promise = fetch(
        `${variables.API_URL}${variables.PRODUCT_CATEGORY_URL}`,
        {
          method: "GET",
        }
      )
        .then((res) => res.json())
        .then((result) => {
          return result;
        });

      let productCategories = await promise;
      dispatch(setProductCategories(productCategories));
    } catch (e) {
      console.log(`Exception: ${e}`);
    }
  };
};

export { setProductCategories, getProductCategories };
