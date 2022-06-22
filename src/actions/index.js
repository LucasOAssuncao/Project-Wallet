import { SUBMIT_PERSONAL_FORM, SUBMIT_WALLET_FORM } from './actionTypes';

const savePersonalForm = (personalProfile) => ({
  type: SUBMIT_PERSONAL_FORM,
  payload: personalProfile,
});

const saveWalletForm = (personalProfile) => ({
  type: SUBMIT_WALLET_FORM,
  payload: personalProfile,
});

export { savePersonalForm, saveWalletForm };
