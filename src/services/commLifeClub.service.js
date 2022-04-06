import axios from 'axios';
import authHeader from './auth-header';

//const API_URL = 'http://localhost:8080/api/lifeClub/';
const API_URL = 'jackfire78/manzanitaResidentualCommunities/api/lifeClub/';

//service used for accessing club data
class ClubService {

  //any requests of authorized resources must contain an HTTP header 
  //create a new community life club
  createCommunityLifeClub(CLifeClub) {
    //post data given at creating a new club.
    return axios.post(API_URL + 'createLifeClub', { headers: authHeader(),
      clubName: CLifeClub.clubName,clubDescription: CLifeClub.clubDescription,
    });
  }

  //retrieve all clubs
  getAllClubs() {
    return axios.get(API_URL + 'allComLifeClubs', { headers: authHeader() })
  }

  //retrieve a single community life club
  getCommunityLifeClub(clubId) {
    return axios.get(API_URL + `getComLifeClub/${clubId}` , { headers: authHeader() })
  }

  //edit an club
  editCommunityLifeClub(clubId, CLifeClub) {
    return axios.put(API_URL + `editComLifeClub/${clubId}`, { headers: authHeader(),
      clubName: CLifeClub.clubName,
      clubDescription: CLifeClub.clubDescription,
    });
  }
  //delete a community life club
  deleteCommunityLifeClub(clubId) {
    return axios.delete(API_URL + `deleteComLifeClub/${clubId}` , { headers: authHeader() });
  }

}

export default new ClubService();