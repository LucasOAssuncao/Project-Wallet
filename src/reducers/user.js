import { SUBMIT_PERSONAL_FORM } from '../actions/actionTypes';

const initialState = {
  email: '',
};

const user = (state = initialState, action) => {
  switch (action.type) {
  case SUBMIT_PERSONAL_FORM:
    return {
      ...state,
      email: action.payload.email,
    };
  default:
    return state;
  }
};

export default user;
