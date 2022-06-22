import { SUBMIT_WALLET_FORM, REQUEST_API } from '../actions/actionTypes';

const initialState = {
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
  default:
    return state;
  }
};

export default wallet;
