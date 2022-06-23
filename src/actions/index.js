import {
  SUBMIT_PERSONAL_FORM,
  SUBMIT_WALLET_FORM,
  REQUEST_API,
  SUBMIT_EXPENCES,
  SUBMIT_EXCHANGES,
} from './actionTypes';

const savePersonalForm = (personalProfile) => ({
  type: SUBMIT_PERSONAL_FORM,
  payload: personalProfile,
});

const saveWalletForm = (personalProfile) => ({
  type: SUBMIT_WALLET_FORM,
  payload: personalProfile,
});

const saveCurrency = (personalProfile) => ({
  type: REQUEST_API,
  payload: personalProfile,
});

const requestAPI = (currency) => ({ type: REQUEST_API, payload: currency });

const saveExchange = (expenses) => ({
  type: SUBMIT_EXCHANGES,
  payload: expenses,
});

const saveId = (type) => ({
  type,
});

function fetchAPI(type) {
  return async (dispatch) => {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    if (type === REQUEST_API) {
      dispatch(saveCurrency(Object.keys(data).filter((e) => e !== 'USDT')));
    }
    // if (type === SUBMIT_EXCHANGES) {
    //   dispatch(saveExchange(data));
    // }
  };
}

const saveExpenses = (expenses) => async (dispatch) => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const exchangeRates = await response.json();
  dispatch({
    type: SUBMIT_EXPENCES,
    payload: {
      ...expenses,
      exchangeRates,
    },
  });
  // type: SUBMIT_EXPENCES,
  // payload: expenses,
};

export {
  savePersonalForm,
  saveWalletForm,
  fetchAPI,
  requestAPI,
  saveExpenses,
  saveExchange,
  saveId,
};
