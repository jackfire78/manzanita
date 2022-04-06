import axios from 'axios';
import authHeader from './auth-header';

//const API_URL = 'http://localhost:8080/api/test/';
const API_URL = 'jackfire78/manzanitaResidentualCommunities/api/test/';

//service used for accessing data
class UserService {
  //Accessible by anyone
  getPublicContent() {
    return axios.get(API_URL + 'all');
  }

  //retrieve information of current logged in user
  getMyProfile(id){
    //return axios.get(`http://localhost:8080/api/auth/getPersonalInfo/${id}` , { headers: authHeader() })
    return axios.get(`jackfire78/manzanitaResidentualCommunities/api/auth/getPersonalInfo/${id}` , { headers: authHeader() })

  }
  //edit method. Used to edit an already existing account
  editMyProfile(id, user) {
    //return axios.put(`http://localhost:8080/api/auth/editPersonalInfo/${id}`, { headers: authHeader(),
    return axios.put(`jackfire78/manzanitaResidentualCommunities/api/auth/editPersonalInfo/${id}`, { headers: authHeader(),
      username: user.username,
      email: user.email,
      phoneNumber: user.phoneNumber,        
      unitNumber: user.unitNumber,
      role: user.role
    });
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