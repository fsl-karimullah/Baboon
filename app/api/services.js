import {post, get, remove, put, patch} from './networking';

export const endpoint = {
  // login: async params => post('api/identity/authentication', params),
  getBook: async params =>
    get(
      'https://www.googleapis.com/books/v1/volumes?q=intitle:laskar+pelangi',
      params,
    ),
};
