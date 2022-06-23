import {
  SUBMIT_WALLET_FORM,
  REQUEST_API,
  SUBMIT_EXPENCES,
  SUBMIT_EXCHANGES,
  RAISE_ID,
  REDUCE_ID,
} from '../actions/actionTypes';

const initialState = {
  id: 0,
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
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
  case SUBMIT_EXCHANGES:
    return {
      ...state,
      exchange: action.payload,
    };
  case RAISE_ID:
    return {
      ...state,
      id: state.id + 1,
    };
  case REDUCE_ID:
    return {
      ...state,
      id: state.id - 1,
    };
  default:
    return state;
  }
};

export default wallet;
