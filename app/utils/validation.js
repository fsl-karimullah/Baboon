import {convertToNumber, isEmpty, isEmail} from './index';
import {REGEX} from '../constants';

export const requiredField = value => (isEmpty(value) ? 'required' : '');
export const requiredNIK = value =>
  !value || value.length !== 16 ? 'invalid NIK' : '';
export const requiredNumber = value =>
  convertToNumber(value) <= 0 ? 'required' : '';
export const validateEmail = value =>
  !isEmail(value) ? 'email is not valid' : '';
export const validateCardId = value =>
  value && value.length > 0 && value.length < 12 ? 'invalid farmer ID' : '';

export const validateAccountNumber = value =>
  !value || value.length < 7 ? 'invalid bank account number' : '';
export const noValidation = () => '';

export function validateEmails(text) {
  const re = new RegExp(REGEX.regExToCheckEmail);
  let value = '';
  if (!re.test(String(text).toLowerCase())) {
    value = true;
  } else {
    value = false;
  }
  return value;
}

export function validatePhoneNumber(text) {
  const res = text.substring(0, 3);
  let value = false;
  if (
    text.length < 10 ||
    text.length > 14 ||
    res === '021' ||
    res === '628' ||
    text.substring(0, 2) !== '08'
  ) {
    value = true;
  }
  return value;
}

export default {
  requiredField,
  requiredNIK,
  requiredNumber,
  validateCardId,
  validateAccountNumber,
  noValidation,
  validateEmail,
};

export const formatMoney = amount =>
  Number(amount)
    .toString()
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$&.');

export const formatMoneyKoma = amount =>
  Number(amount)
    .toString()
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$&,');
