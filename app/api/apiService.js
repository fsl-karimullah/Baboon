const url = 'http://127.0.0.1:8000/api';
export const endpoint =  {
  getBook: `${url}/books`,
  getMoreBook: `${url}/books?page=`,
  // getBookDetail: async id => `${url}/books/${id}`,
  registerUser: `${url}/register`,
  loginUser: `${url}/login`,
  payment: `${url}/subscribe/`,
  getBookmark: `${url}/bookmarks`,
  searchBook: `${url}/books?query=`,
  searchBookByCategory: `${url}/books/?category_id=`,
  deleteBookmark: `${url}/bookmarks/`,
  selectCategory: `${url}/categories`,
  editProfile : `${url}/profile`,
  forgotPassword:`${url}/forgot-password`,
  logout:`${url}/logout`,
   

}; 
 