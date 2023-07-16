import * as product from './constants';

let initialState = {
    productList: [],
    product: null
}

const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case product.GET_LIST:
            return {
                ...state,
                productList: action.value
            }
        case product.GET_BY_ID:
            return {
                ...state,
                product: action.value
            }
        case product.GET_BY_SEARCH:
            return {
                ...state,
                productList: action.value
            }
        default:
            return state;
    }
}

export default productReducer;