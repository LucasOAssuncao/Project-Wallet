import SUBMIT_PERSONAL_FORM from '../actions';

const initialState = {
  wallet: {
    currencies: [], // array de string
    expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
    editor: false, // valor booleano que indica de uma despesa está sendo editada
    idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
  },
};

const formWalletReducer = (state = initialState, action) => {
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

export default formWalletReducer;
