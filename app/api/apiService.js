const url = 'http://127.0.0.1:8000/api';
export const endpoint = {
  getBook: `${url}/books`,
  getMoreBook: `${url}/books?page=`,
  // getBookDetail: async id => `${url}/books/${id}`,
  registerUser: `${url}/register`,
  loginUser: `${url}/login`,
  payment: `http://127.0.0.1:8000/api/subscribe/`
};
 