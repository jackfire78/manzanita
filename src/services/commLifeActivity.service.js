import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/test/';
//service used for accessing activity data
class ActivityService {

  //any requests of authorized resources must contain an HTTP header 
 //create a new community life activity
  createCommunityLifeActivity(CLifeActivity) {
    //post data given at creating a new account.
    return axios.post(API_URL + 'createCLifeActivity', { headers: authHeader(),
      activityName: CLifeActivity.activityName,
      activityDate: CLifeActivity.activityDate,
      activityDescription: CLifeActivity.activityDescription,
      activityPrice: CLifeActivity.activityPrice
    });
  }

  //retrieve all events
  getAllActivities() {
    return axios.get(API_URL + 'allCLifeActivities', { headers: authHeader() })
    .then(response => response.data);
  }

  //retrieve a single community life activity
  getCommunityLifeActivity(activityID) {
    return axios.get(API_URL + 'getCLifeActivity/' + activityID , { headers: authHeader() })
    .then(response => response.data);
  }

  //edit an activity
  editCommunityLifeActivity(CLifeActivity) {
    return axios.put(API_URL + 'editCLifeActivity' + CLifeActivity.activityID, { headers: authHeader(),
      activityName: CLifeActivity.activityName,
      activityDate: CLifeActivity.activityDate,
      activityDescription: CLifeActivity.activityDescription,
      activityPrice: CLifeActivity.activityPrice
    });
  }
  //delete a community life activity
  deleteCommunityLifeActivity(activityID) {
    return axios.delete(API_URL + 'deleteCLifeActivity/' + activityID , { headers: authHeader() });
  }

}

export default new ActivityService();