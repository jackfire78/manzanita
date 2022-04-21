import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/adminServices/';
//service used for accessing admin data
class AdminService {

  //any requests of authorized resources must contain an HTTP header 

  //User Management 
  //retrieve all users
  getAllUsers() {
    return axios.get(API_URL + 'allUsers', { headers: authHeader() })
  }

  //Worker Management 
  //retrieve all workers
  getAllWorkers() {
    return axios.get(API_URL + 'allWorkers', { headers: authHeader() })
  }

  //retrieve an account
  getAccountInfo(userId) {
    return axios.get(API_URL + `getAccountInfo/${userId}` , { headers: authHeader() });
  }

  //delete an account
  deleteAccount(userID) {
    return axios.delete(API_URL + 'deleteAccount/' + userID , { headers: authHeader() });
  }

}

export default new AdminService();