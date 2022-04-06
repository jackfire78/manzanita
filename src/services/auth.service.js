import axios from 'axios';


//initial url location
//const API_URL = 'http://localhost:8080/api/auth/';
const API_URL = 'jackfire78/manzanitaResidentualCommunities/api/auth/';

//method to verify login and register services
class AuthService {
  login(user) {
    //post user info given at login to back-end then expect a response
    return axios
      .post(API_URL + 'signin', {
        username: user.username,
        password: user.password
      })  //if response contains an accessToken then save user in local storage
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }
        //return data retrieved 
        return response.data;
      });
  }

  //method for logout. Clear local storage of user information
  logout() {
    localStorage.removeItem('user');
  }

  //register method. Used for creating a new account
  register(user) {
    //post data given at creating a new account.
    return axios.post(API_URL + 'signup', {
      username: user.username,
      password: user.password,
      email: user.email,
      phoneNumber: user.phoneNumber,
      unitNumber: user.unitNumber,
      role: user.role
    });
  }
}

export default new AuthService();