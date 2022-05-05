import { toast } from "react-toastify";
// import Loader from "react-js-loader";

import API from "./api.js";
import { getValueFromLs, setValueInLs } from "../utils/helpers.js";
import {
  loginRequest,
  loginSuccess,
  loginError,
  getRequest,
  getSuccess,
  getError,
  getUserRequest,
  getUserSuccess,
  getUserError,
  getTeamRequest,
  getTeamSuccess,
  getTeamError,
} from "../actions/actionCreators";

// const useLoader = () => {
//   var [loading, setLoading] = useState(null);
//   return (
//     <Loader
//       type="spinner-circle"
//       color="#00BFFF"
//       height={100}
//       width={100}
//       visible={loading}
//     />
//   );
// };

export const getAll = () => {
  return (dispatch) => {
    dispatch(getRequest());
    API.get("/all")
      .then((response) => {
        dispatch(getSuccess(response.data));
      })
      .catch((error) => {
        dispatch(getError(error));
      });
  };
};

export const getUser = (id) => {
  return async (dispatch) => {
    try {
      dispatch(getUserRequest());
      const response = await API.get(`/user/${id}`, {
        headers: {
          authorization: getValueFromLs("token"),
        },
      });
      dispatch(getUserSuccess(response.data));
      return { getUser: true };
    } catch (error) {
      dispatch(getUserError(error));
      return { getUser: false };
    }
  };
};

export const getTeam = (id) => {
  return async (dispatch) => {
    try {
      dispatch(getTeamRequest());
      const response = await API.get(`/team/${id}`, {
        headers: {
          authorization: getValueFromLs("token"),
        },
      });
      dispatch(getTeamSuccess(response.data));
      return { getTeam: true };
    } catch (error) {
      dispatch(getTeamError(error));
      toast.error(error.response.data)
      return { getTeam: false };
    }
  };
};

export const register = (user) => {
  return async () => {
    try {
      const response = await API.post("/register", user);

      toast.success(response.data);
      return { register: true };
    } catch (error) {
      toast.error(error.response.data);
      return { register: false };
    }
  };
};

export const addUser = (user,id) => {
  return async (dispatch) => {
    try {
      const response = await API.post(`/add/${id}`, user, {
        headers: {
          authorization: getValueFromLs("token"),
        },
      });
      await dispatch(getAll())
      toast.success(response.data);
      return { addNew: true };
    } catch (error) {
      toast.error(error.response.data);
      return { addNew: false };
    }
  };
};

export const loginUser = (user) => {
  return async (dispatch) => {
    try {
      dispatch(loginRequest());
      const response = await API.post("/login", user);

      //setting token..
      setValueInLs("token",response.data.token);
      setValueInLs("isAdmin",response.data.isAdmin)

      dispatch(loginSuccess(response.data));
      await dispatch(getUser(response.data._id));
      toast.success("logged in successfully");
      return { login: true };
    } catch (error) {
      dispatch(loginError(error.response.data));
      toast.error(error.response.data);
      return { login: false };
    }
  };
};

export const updateProfile = (user, id) => {
  return async (dispatch) => {
    try {
      const response = await API.patch(`/editProfile/${id}`, user, {
        headers: {
          authorization: getValueFromLs("token"),
        },
      });
      toast.success("Profile updated successfully");
      dispatch(getUserSuccess(response.data));
      return { editProfile: true };
    } catch (error) {
      dispatch(getTeamError(error));
      toast.error(error.response.data.message);
      return { editProfile: false };
    }
  };
};

export const editUser = (user) => {
  return async (dispatch) => {
    try {
      const { _id: id } = user;

      const response = await API.patch(`/edit/${id}`, user, {
        headers: {
          authorization: getValueFromLs("token"),
        },
      });
      await dispatch(getUser(id));
      toast.success("user updated successfully");
      return { edit: true };
    } catch (error) {
      toast.error(error.response.data.message);
      return { edit: false };
    }
  };
};

export const deleteUser = (_id) => {
  return async (dispatch) => {
    try {
      const response = await API.delete("/delete", {
        headers: {
          authorization: getValueFromLs("token"),
        },
        data: { _id },
      });
      await dispatch(getAll())
      // toast.success("deleted successfully");
      return { delete: true };
    } catch (error) {
      toast.error(error.response.data.message);
      return { delete: false };
    }
  };
};

// export const userFetch = () => {
//   return async dispatch => {
//       try {
//           dispatch(fetchUserRequest);
//           const response = await axios.get('https://jsonplaceholder.typicode.com/users');
//           dispatch(fetchUserSuccess(response.data));
//           console.log(response.data);
//       }
//       catch(error){
//           dispatch(fetchUserError(error.message));
//       }
//   }
// }
