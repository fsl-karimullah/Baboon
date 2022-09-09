// /* global fetch:false */
// eslint-disable-next-line import/extensions
// import { fetch } from 'react-native-ssl-pinning';
import tokenService from '../utils/tokens';
import cacheService from '../utils/cache';
import storage from '../utils/storage';
import _ from 'lodash';
import STORAGE_KEY from './../constants/storageKey';
export const config = {
  baseUrl: 'http://dev.yoo.golf/',
  baseUrlImg: 'http://dev.yoo.golf',
};
const Authorization = {};
export const STATUS_CODE = {
  OK: 200,
  NOT_FOUND: 404,
  NO_CONTENT: 204,
};

const fetchData = async (url, params, customHeaders, cachedControll) => {
  let headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    ...customHeaders,
  };
  const tokens = await tokenService.get();
  const statusToken = await storage.get(STORAGE_KEY.TOKEN);

  headers = {
    ...headers,
    Authorization: `Bearer ${statusToken}`,
  };
  // }
  // console.log('tokens Network', JSON.stringify(headers));
  console.log('url Network', url);
  console.log('params Network', JSON.stringify(params));

  const response = await fetch(url, {
    ...params,
    headers,
    timeoutInterval: 30000,
    trusty: true,
  });
  // for DELETE method case
  // console.log('response',response);
  if (!response) return {};
  if (response.status === STATUS_CODE.NO_CONTENT) return {};
  const json = await response.json();

  console.log('respon Network', JSON.stringify(json));
  return json;

};

const get = async (
  endpoint,
  params = {},
  cachedControll = {},
  headers = {},
) => {
  const {cached = false, update = false, name} = cachedControll;
  let queryString = Object.keys(params)
    .map(key => `${key}=${params[key]}`)
    .join('&');
  if (queryString.length > 0) {
    queryString = `?${queryString}`;
  }

  const url = `${config.baseUrl}${endpoint}${queryString}`;
  const fetchParams = {
    method: 'GET',
  };

  if (!update && cached && name) {
    const result = await cacheService.get(name);
    if (result) {
      return result;
    }
  }
  return fetchData(url, fetchParams, headers, cachedControll);
};

const post = async (endpoint, params = {}, headers = {}) => {
  const url = `${config.baseUrl}${endpoint}`;
  const fetchParams = {
    method: 'POST',
    body: JSON.stringify(params),
  };
  return fetchData(url, fetchParams, headers);
};

const patch = async (endpoint, params = {}, headers = {}) => {
  const url = `${config.baseUrl}${endpoint}`;
  const fetchParams = {
    method: 'PATCH',
    body: JSON.stringify(params),
  };
  return fetchData(url, fetchParams, headers);
};

const put = async (endpoint, params = {}, headers = {}) => {
  const url = `${config.baseUrl}${endpoint}`;
  const fetchParams = {
    method: 'PUT',
    body: JSON.stringify(params),
  };
  return fetchData(url, fetchParams, headers);
};

const remove = async (endpoint, params = {}, headers = {}) => {
  const url = `${config.baseUrl}${endpoint}`;
  const fetchParams = {
    method: 'DELETE',
    body: JSON.stringify(params),
  };
  return fetchData(url, fetchParams, headers);
};

export {get, post, put, patch, remove};
