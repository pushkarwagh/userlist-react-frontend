import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  GET_REQUEST,
  GET_SUCCESS,
  GET_ERROR,
  DELETE_USERS,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_ERROR,
  GET_TEAM_REQUEST,
  GET_TEAM_SUCCESS,
  GET_TEAM_ERROR,
} from "./actionTypes";

export const getRequest = () => {
  return {
    type: GET_REQUEST,
  };
};

export const getSuccess = (data) => {
  return {
    type: GET_SUCCESS,
    payload: data,
  };
};

export const getError = (error) => {
  return {
    type: GET_ERROR,
    payload: error,
  };
};

export const deleteUsers = (id) => {
  return {
    type: DELETE_USERS,
    payload: id,
  };
};

export const getUserRequest = () => {
  return {
    type: GET_USER_REQUEST,
  };
};

export const getUserSuccess = (data) => {
  return {
    type: GET_USER_SUCCESS,
    payload: data,
  };
};

export const getUserError = (error) => {
  return {
    type: GET_USER_ERROR,
    payload: error,
  };
};

export const getTeamRequest = () => {
  return {
    type: GET_TEAM_REQUEST,
  };
};

export const getTeamSuccess = (data) => {
  return {
    type: GET_TEAM_SUCCESS,
    payload: data,
  };
};

export const getTeamError = (error) => {
  return {
    type: GET_TEAM_ERROR,
    payload: error,
  };
};

export const loginRequest = () => {
  return {
    type: LOGIN_REQUEST,
  };
};

export const loginSuccess = (data) => {
  return {
    type: LOGIN_SUCCESS,
    payload: data,
  };
};

export const loginError = (error) => {
  return {
    type: LOGIN_ERROR,
    payload: error,
  };
};
