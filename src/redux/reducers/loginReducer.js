import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_ERROR } from '../actions/actionTypes';

const initialState = {
  loading: null,
  users: {},
  error: '',
  profile: null,
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload ,
        error: '',
      };

    case LOGIN_ERROR:
     
      return {
        ...state,
        loading: false,
        users : {},
        error: action.payload
      };
            
    default:
      return state;
  }
};



export default loginReducer;