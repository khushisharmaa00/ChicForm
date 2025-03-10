import { api } from "../../config/apiConfig";
import {
  CANCEL_ORDER_FAILURE,
  CANCEL_ORDER_REQUEST,
  CANCEL_ORDER_SUCCESS,
  CREATE_ORDER_FAILURE,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  GET_ORDER_BY_ID_FAILURE,
  GET_ORDER_BY_ID_REQUEST,
  GET_ORDER_BY_ID_SUCCESS,
  GET_ORDERS_BY_USER_ID_FAILURE,
  GET_ORDERS_BY_USER_ID_REQUEST,
  GET_ORDERS_BY_USER_ID_SUCCESS,
} from "./ActionType";

export const createOrder = (reqData) => async (dispatch) => {
  // console.log("req data ",reqData);
  dispatch({ type: CREATE_ORDER_REQUEST });
  try {
    console.log("Request Payload:", reqData.address);
    const { data } = await api.post(`/api/orders/`, reqData.address);
    if (data._id) {
      reqData.navigate({ search: `step=3&order_id=${data._id}` });
    }
    console.log("created order  ", data);
    dispatch({
      type: CREATE_ORDER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log("catch error", error);
    dispatch({
      type: CREATE_ORDER_FAILURE,
      payload: error.message,
    });
  }
};

export const getOrderById = (orderId) => async (dispatch) => {
  //   console.log("get order req", orderId);
  dispatch({ type: GET_ORDER_BY_ID_REQUEST });
  try {
    const { data } = await api.get(`/api/orders/${orderId}`);
    console.log(" order by id", data);
    dispatch({
      type: GET_ORDER_BY_ID_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log("catch", error);
    dispatch({
      type: GET_ORDER_BY_ID_FAILURE,
      payload: error.message,
    });
  }
};

export const getOrdersByUserId = (userId) => async (dispatch) => {
  dispatch({ type: GET_ORDERS_BY_USER_ID_REQUEST });
  try {
    const { data } = await api.get(`/api/orders/user/${userId}`);
    console.log("orders by user id", data);
    dispatch({
      type: GET_ORDERS_BY_USER_ID_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log("catch", error);
    dispatch({
      type: GET_ORDERS_BY_USER_ID_FAILURE,
      payload: error.message,
    });
  }
};

export const cancelOrder = (orderId) => async (dispatch) => {
  dispatch({ type: CANCEL_ORDER_REQUEST });
  try {
    const { data } = await api.put(`/api/orders/${orderId}/cancel`);
    dispatch({
      type: CANCEL_ORDER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CANCEL_ORDER_FAILURE,
      payload: error.message,
    });
  }
};
