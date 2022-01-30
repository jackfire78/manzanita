export default function authHeader() {
    let user = JSON.parse(localStorage.getItem('user'));
    //auth header contains both user and an access token return both 
    if (user && user.accessToken) {
      return { Authorization: 'Bearer ' + user.accessToken };
    } else { //otherwise return empty meaning not logged in or loss of information
      return {};
    }
  }