import {
  ADD_EMPLOYEE,
  EDIT_EMPLOYEE,
  DELETE_EMPLOYEE,
  UPDATE_EMPLOYEE
} from "./actionsType";

export const addEmployee = data => ({
  type: ADD_EMPLOYEE,
  payload: {
    ...data
  }
});

export const editEmployee = id => ({
  type: EDIT_EMPLOYEE,
  payload: { id }
});

export const deleteEmployee = id => ({
  type: DELETE_EMPLOYEE,
  payload: { id }
});

export const updateEmployeeData = data => ({
  type: UPDATE_EMPLOYEE,
  payload: {
    ...data
  }
});
