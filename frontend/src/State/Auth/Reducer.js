import {
  GET_USER_FAILURE,
  GET_USER_REQUEST,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGOUT,
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  GET_USER_SUCCESS,
} from "./ActionType";
const token = localStorage.getItem("jwt");
const storedUser = localStorage.getItem("user");
const initialState = {
  user: storedUser ? JSON.parse(storedUser) : null,
  isLoading: false,
  error: null,
  jwt: token || null,
};
export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_REQUEST:
    case LOGIN_REQUEST:
    case GET_USER_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };

    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem("jwt", action.payload.jwt);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      return {
        ...state,
        jwt: action.payload.jwt,
        user: action.payload.user,
        isLoading: false,
        error: null,
      };
    case GET_USER_SUCCESS:
      localStorage.setItem("user", JSON.stringify(action.payload));
      return {
        ...state,
        isLoading: false,
        error: null,
        user: action.payload,
      };

    case REGISTER_FAILURE:
    case LOGIN_FAILURE:
    case GET_USER_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    case LOGOUT:
      localStorage.removeItem("jwt");
      localStorage.removeItem("user");
      return {
        ...initialState,
      };

    default:
      return state;
  }
};
