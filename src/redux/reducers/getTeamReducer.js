import { GET_TEAM_REQUEST, GET_TEAM_SUCCESS, GET_TEAM_ERROR } from "../actions/actionTypes";

const initialState = {
  loading: null,
  users: {},
  error: "",
};

const getTeamReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TEAM_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case GET_TEAM_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload,
        error: "",
      };

    case GET_TEAM_ERROR:
      return {
        loading: false,
        users: {},
        error: action.payload,
      };
      
    default:
      return state;
  }
};

export default getTeamReducer;
