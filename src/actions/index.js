import { SUBMIT_PERSONAL_FORM, SUBMIT_WALLET_FORM, REQUEST_API } from './actionTypes';

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

function fetchAPI() {
  return async (dispatch) => {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    dispatch(saveCurrency(Object.keys(data).filter((e) => e !== 'USDT')));
  };
}

export { savePersonalForm, saveWalletForm, fetchAPI, requestAPI };
