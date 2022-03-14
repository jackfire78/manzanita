import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/test/';
//service used for accessing data
class UserService {
  //does not need a header. Accessible by anyone
  getPublicContent() {
    return axios.get(API_URL + 'all');
  }

  //retrieve information of current logged in user
  getMyProfile(id){
    return axios.get(`http://localhost:8080/api/auth/getPersonalInfo/${id}` , { headers: authHeader() })
  }
  //any requests of authorized resources must contain an HTTP header 
  //with the help of authHeader() function
  getUserBoard() {
    return axios.get(API_URL + 'user', { headers: authHeader() });
  }

  getModeratorBoard() {
    return axios.get(API_URL + 'mod', { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + 'admin', { headers: authHeader() });
  }
}

export default new UserService();