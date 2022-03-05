import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/test/';
//service used for accessing club data
class ClubService {

  //any requests of authorized resources must contain an HTTP header 
  //create a new community life club
  createCommunityLifeClub(CLifeClub) {
    //post data given at creating a new club.
    return axios.post(API_URL + 'createCLifeClub', { headers: authHeader(),
      clubName: CLifeClub.clubName,
      clubDescription: CLifeClub.clubDescription,
    });
  }

  //retrieve all clubs
  getAllClubs() {
    return axios.get(API_URL + 'allCLifeClubs', { headers: authHeader() })
    .then(response => response.data);
  }

  //retrieve a single community life club
  getCommunityLifeClub(clubID) {
    return axios.get(API_URL + 'getCLifeClub/' + clubID , { headers: authHeader() })
    .then(response => response.data);
  }

  //edit an club
  editCommunityLifeClub(CLifeClub) {
    return axios.put(API_URL + 'editCLifeClub' + CLifeClub.clubID, { headers: authHeader(),
      clubName: CLifeClub.clubName,
      clubDescription: CLifeClub.clubDescription,
    });
  }
  //delete a community life club
  deleteCommunityLifeClub(clubID) {
    return axios.delete(API_URL + 'deleteCLifeClub/' + clubID , { headers: authHeader() });
  }

}

export default new ClubService();