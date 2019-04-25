import {
  ADD_EMPLOYEE,
  GET_EMPLOYEE,
  DELETE_EMPLOYEE,
  EDIT_EMPLOYEE,
  UPDATE_EMPLOYEE
} from "../actions/actionsType";
const reducer = (state = [], action) => {
  console.log(state);
  switch (action.type) {
    case ADD_EMPLOYEE:
      return state.concat([action.payload]);
    case DELETE_EMPLOYEE:
      return state.filter(employees => employees.id !== action.payload.id);
    case EDIT_EMPLOYEE: {
      const x = state.map(employees => {
        if (employees.id === action.payload.id) {
          employees["edit"] = true;
        } else {
          employees["edit"] = false;
        }
        return employees;
      });

      return [...x];
    }
    case GET_EMPLOYEE:
      return [...state];
    case UPDATE_EMPLOYEE: {
      let index = -1;
      const empState = state.filter((employees, i) => {
        if (employees.id === action.payload.id) {
          index = i;
        }
      });

      // state.indexOf(action.payload);
      if (state[index]["id"] === action.payload.id) {
        action.payload.edit = false;
        state[index] = action.payload;
      }
      return [...state];
    }
    default:
      return state;
  }
};

export default reducer;
