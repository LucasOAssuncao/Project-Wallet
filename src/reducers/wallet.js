import {
  SUBMIT_WALLET_FORM,
  REQUEST_API,
  SUBMIT_EXPENCES,
  RAISE_ID,
  REMOVE_EXPENCES,
  EDIT_EXPENCE,
  UPDATE_EXPENCE,
} from '../actions/actionTypes';

const initialState = {
  id: 0,
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
  objToEdit: {},
};

const wallet = (state = initialState, action) => {
  switch (action.type) {
  case SUBMIT_WALLET_FORM:
    return {
      ...state,
    };
  case REQUEST_API:
    return {
      ...state,
      currencies: action.payload,
    };
  case SUBMIT_EXPENCES:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };
  case REMOVE_EXPENCES:
    return {
      ...state,
      expenses: state.expenses.filter((e) => e.id !== action.id),
    };
  case RAISE_ID:
    return {
      ...state,
      id: state.id + 1,
    };
  case EDIT_EXPENCE:
    return {
      ...state,
      editor: true,
      idToEdit: action.id,
      objToEdit: action.objToEdit,
    };
  case UPDATE_EXPENCE:
    return {
      ...state,
      expenses: state.expenses.map((e) => {
        if (e.id === action.objEdited.id) {
          return action.objEdited;
        }
        return e;
      }),
      editor: false,
      idToEdit: '',
      objToEdit: {},
    };
  default:
    return state;
  }
};

export default wallet;
