// Customer/Action.js
import {
  FETCH_CUSTOMERS_REQUEST,
  FETCH_CUSTOMERS_SUCCESS,
  FETCH_CUSTOMERS_FAILURE,
  UPDATE_CUSTOMER_REQUEST,
  UPDATE_CUSTOMER_SUCCESS,
  UPDATE_CUSTOMER_FAILURE,
  DELETE_CUSTOMER_REQUEST,
  DELETE_CUSTOMER_SUCCESS,
  DELETE_CUSTOMER_FAILURE,
} from "./ActionType";
import { api } from "../../../config/apiConfig";

// Fetch all customers
export const fetchCustomers = () => {
  return async (dispatch) => {
    dispatch({ type: FETCH_CUSTOMERS_REQUEST });
    try {
      const { data } = await api.get("/api/users");
      dispatch({ type: FETCH_CUSTOMERS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: FETCH_CUSTOMERS_FAILURE, payload: error.message });
    }
  };
};

// Update customer (for both details and block/unblock)
export const updateCustomer = (customerId, updatedData) => {
  return async (dispatch) => {
    dispatch({ type: UPDATE_CUSTOMER_REQUEST });
    try {
      const { data } = await api.put(`/api/users/${customerId}`, updatedData);
      dispatch({ type: UPDATE_CUSTOMER_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: UPDATE_CUSTOMER_FAILURE, payload: error.message });
    }
  };
};

// Delete a customer
export const deleteCustomer = (customerId) => {
  return async (dispatch) => {
    dispatch({ type: DELETE_CUSTOMER_REQUEST });
    try {
      await api.delete(`/api/users/${customerId}`);
      dispatch({ type: DELETE_CUSTOMER_SUCCESS, payload: customerId });
    } catch (error) {
      dispatch({ type: DELETE_CUSTOMER_FAILURE, payload: error.message });
    }
  };
};
