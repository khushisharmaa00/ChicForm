// Customer/Reducer.js
import {
  FETCH_CUSTOMERS_REQUEST,
  FETCH_CUSTOMERS_SUCCESS,
  FETCH_CUSTOMERS_FAILURE,
  UPDATE_CUSTOMER_SUCCESS,
  DELETE_CUSTOMER_SUCCESS,
} from "./ActionType";

const initialState = {
  customers: [],
  loading: false,
  error: null,
};

export const admincustomerReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CUSTOMERS_REQUEST:
      return { ...state, loading: true, error: null };

    case FETCH_CUSTOMERS_SUCCESS:
      return { ...state, loading: false, customers: action.payload };

    case FETCH_CUSTOMERS_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case UPDATE_CUSTOMER_SUCCESS:
      return {
        ...state,
        customers: state.customers.map((customer) =>
          customer._id === action.payload._id ? action.payload : customer
        ),
      };

    case DELETE_CUSTOMER_SUCCESS:
      return {
        ...state,
        customers: state.customers.filter(
          (customer) => customer._id !== action.payload
        ),
      };

    default:
      return state;
  }
};
