import { GET_USER_REQUEST, GET_USER_SUCCESS, GET_USER_ERROR } from "../actions/actionTypes";

const initialState = {
  loading: null,
  user: {},
  error: "",
};

const getUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case GET_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
        error: "",
      };

    case GET_USER_ERROR:
      return {
        loading: false,
        user: {},
        error: action.payload,
      };
      
    default:
      return state;
  }
};

export default getUserReducer;
