// eslint-disable-next-line import/prefer-default-export
import moment from 'moment';
import {config} from '../api/networking';
import {REGEX} from '../constants';

export function isEmpty(value) {
  return value === null || value === undefined || String(value).trim() === '';
}

export const getNumberOnly = (string = '') => {
  try {
    return string.replace(/[^\d]+/g, '');
  } catch (error) {
    return string;
  }
};
export const getDateOnly = (string) => {
  try {
    let tmpdate = string.toISOString()
    return tmpdate.split('T')[0]
  } catch (error) {
    return string;
  }
};

export const convertToNumber = (string = '') => {
  const numberString = getNumberOnly(string);
  return isEmpty(numberString) ? 0 : parseFloat(numberString);
};

export function formatRupiah(number, awalan = 'IDR') {
  try {
    const num = Number(number)
      .toString()
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$&.');

    return `${awalan} ${num}`;
  } catch (error) {
    return `${number}`;
  }
}

export function formatTanggal(tgl) {
  try {
    var explode = tgl.split('-');
    var thn = explode[2];
    var bln = explode[1];
    var hari = explode[0];
    var listbulan = [
      '',
      'Januari',
      'Februari',
      'Maret',
      'April',
      'Mei',
      'Juni',
      'Juli',
      'Agustus',
      'September',
      'Oktober',
      'November',
      'Desember',
    ];

    var harinya = thn + ' ' + listbulan[parseInt(bln)] + ' ' + hari;
    return harinya;
  } catch (error) {
    return tgl;
  }
}
export function formatTanggal2(tgl) {
  try {
    var explode = tgl.split('-');

    var thn = explode[2];
    var bln = explode[1];
    var hari = explode[0];
    var listbulan = [
      '',
      'Januari',
      'Februari',
      'Maret',
      'April',
      'Mei',
      'Juni',
      'Juli',
      'Agustus',
      'September',
      'Oktober',
      'November',
      'Desember',
    ];

    var harinya =
      listbulan[parseInt(bln)].substring(0, 3) + ' ' + thn + ', ' + hari;
    return harinya;
  } catch (error) {
    return tgl;
  }
}

export function dateFormatReadable(dateFormat) {
  const day = dateFormat.substring(dateFormat.length - 2, dateFormat.length);
  const month = dateFormat.substring(2, 6);
  const year = dateFormat.substring(0, 4);

  return `${month} ${day}, ${year}`;
}
export function getDayDate(valueDay) {
  // const getDayValue = valueDay.substring(valueDay.length - 2, valueDay.length);
  const getDayValue = new Date(valueDay).toLocaleString('en-us', {
    weekday: 'long',
  });
  const day = getDayValue.substring(0, 3);
  return ` ${day}`;
}

export function formatPhoneNumber(numberPhone) {
  const number = String(numberPhone).replace(/\B(?=(\d{4})+(?!\d))/g, ' ');

  return number;
}

/**
 * Get text and space only
 * for example: "walter @#$@$ngo#%#@" => "walter ngo"
 * @param str
 * @return {string}
 */
export const getTextAndSpaceOnly = (str = '') =>
  str.replace(/[^A-Za-z\s]/g, '');

export const noop = () => {};

export const formatDate = (date, format) => moment(date).format(format);
export const renderUrlImage = path => config.baseUrlImg + path;

/**
 * Get last characters
 * @param {String} value
 * @param {Number} numberOfCharacters
 * @return {string}
 */
export const getFirstCharacters = (value = '', numberOfCharacters = 0) => {
  if (value.length > numberOfCharacters) {
    return value.slice(0, numberOfCharacters);
  }
  return value;
};

/**
 * Get last characters
 * @param {String} value
 * @param {Number} numberOfCharacters
 * @return {string}
 */
export const getLastCharacters = (value = '', numberOfCharacters = 0) => {
  if (value.length > numberOfCharacters) {
    return value.slice(-numberOfCharacters);
  }
  return value;
};

/**
 * Validate a string is an email or not
 * @param email
 * @return {boolean}
 */
export const isEmail = email =>
  /* eslint-disable no-useless-escape */
  REGEX.regExToCheckEmail.test(String(email).toLowerCase());

/**
 * Return empty function
 */

/**
 * Convert String To Title Case <-- like this comment
 */
export const toTitleCase = (str = '') => {
  if (str == null) {
    return str;
  }
  return str.replace(
    /\w\S*/g,
    txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(),
  );
};

/**
 * to find item in collections by id
 * @param {Array} collections - format: [{ name, id }]
 * @param id
 * @return {string}
 */
export const findNameById = (collections, id) => {
  const foundItem = collections.find(item => item.id === id);
  return foundItem ? foundItem.name : '';
};

export const checkSpecialCharacter = (str = '') =>
  str.match(/[^A-Za-z0-9_\s]/gi) !== null;

export const transformText = (
  value,
  params = {numberOnly: false, textAndSpaceOnly: false},
) => {
  if (params.numberOnly) return getNumberOnly(value);
  else if (params.textAndSpaceOnly) return getTextAndSpaceOnly(value);
  return value;
};

/**
 * Verifying provided fields named -> "fieldsChecker"
 * Provided excluding mandatory fields will not be checked
 * Defining types inside the typesDefines constant,
 * if type is not supported will return default as false <- marked as an Invalid
 * @param {Object} fields - format: Object<Name: {value, type}>
 * @param {Array} excludingNotMandatoryFields - format: [string]
 * return Valid = Boolean
 */
export const checkFieldHasValue = ({value, type}) =>
  (!!typesDefine[type] && typesDefine[type](value)) || typesDefine.default();
