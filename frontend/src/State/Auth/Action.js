import axios from "axios";
import { API_BASE_URL } from "../../config/apiConfig";
import {
  GET_USER_FAILURE,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
} from "./ActionType";

// const token = localStorage.getItem("jwt");
// if (!token) {
//   console.error("No JWT token found");
// }

const registerRequest = () => ({ type: REGISTER_REQUEST });
const registerSuccess = (user) => ({ type: REGISTER_SUCCESS, payload: user });
const registerFailure = (error) => ({ type: REGISTER_FAILURE, payload: error });

export const register = (userData) => async (dispatch) => {
  dispatch(registerRequest());

  try {
    const response = await axios.post(`${API_BASE_URL}/auth/signup`, userData);
    // const user = response.data;
    const { jwt, user } = response.data;

    if (jwt) {
      // localStorage.setItem("jwt", user.jwt);
      localStorage.setItem("jwt", jwt);
    }
    console.log("Registered User:", user);
    // dispatch(registerSuccess(user.jwt));
    dispatch(registerSuccess({ jwt, user }));
  } catch (error) {
    dispatch(registerFailure(error.message));
  }
};

const loginRequest = () => ({ type: LOGIN_REQUEST });
const loginSuccess = (user) => ({ type: LOGIN_SUCCESS, payload: user });
const loginFailure = (error) => ({ type: LOGIN_FAILURE, payload: error });

export const login = (userData) => async (dispatch) => {
  dispatch(loginRequest());

  try {
    const response = await axios.post(`${API_BASE_URL}/auth/signin`, userData);
    const { jwt, user } = response.data;
    if (jwt) {
      localStorage.setItem("jwt", jwt);
      localStorage.setItem("user", JSON.stringify(user));
    }

    console.log("Logged-in User:", user);

    dispatch(loginSuccess({ jwt, user }));
    return user;
  } catch (error) {
    console.error("Login Error:", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
    });
    dispatch(loginFailure(error.message));
    throw error;
  }
};

const getUserRequest = () => ({ type: GET_USER_REQUEST });
const getUserSuccess = (user) => ({ type: GET_USER_SUCCESS, payload: user });
const getUserFailure = (error) => ({ type: GET_USER_FAILURE, payload: error });

export const getUser = (jwt) => async (dispatch) => {
  dispatch(getUserRequest());
  const jwt = localStorage.getItem("jwt");
  if (!jwt) {
    console.error("No JWT found in localStorage");
    dispatch(getUserFailure("No JWT Token Found"));
    return;
  }

  try {
    const response = await axios.get(`${API_BASE_URL}/api/users/profile`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    const user = response.data;
    console.log("user", user);
    dispatch(getUserSuccess(user));
  } catch (error) {
    console.error("Get User Error:", error.message);
    dispatch(getUserFailure(error.message));
  }
};

export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT, payload: null });
  localStorage.clear();
};
