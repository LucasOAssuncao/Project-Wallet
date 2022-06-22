import SUBMIT_PERSONAL_FORM from '../actions';

const initialState = {
  user: {
    email: '', // string que armazena o email da pessoa usuária
  },
};

const formUserReducer = (state = initialState, action) => {
  switch (action.type) {
  case SUBMIT_PERSONAL_FORM:
    return {
      ...state,
      user: {
        ...action.payload,
      },
    };
  default:
    return state;
  }
};

export default formUserReducer;
