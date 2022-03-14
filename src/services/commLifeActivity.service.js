import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/lifeActivity/';
//service used for accessing activity data
class ActivityService {

  //any requests of authorized resources must contain an HTTP header 
 //create a new community life activity
  createCommunityLifeActivity(activity) {
    //post data given at creating a new account.
    return axios.post(API_URL + 'createLifeActivity', { headers: authHeader(),
      activityName: activity.activityName,
      activityDate: activity.activityDate,
      activityDescription: activity.activityDescription,
      activityPrice: activity.activityPrice
    });
  }

  //retrieve all activities
  getAllActivities() {
    return axios.get(API_URL + 'allComLifeActivities', { headers: authHeader() })
  }

  //retrieve a single community life activity
  getCommunityLifeActivity(activityID) {
    return axios.get(API_URL + `getComLifeActivity/${activityID}` , { headers: authHeader() })
  }

  //edit an activity
  editCommunityLifeActivity(activityID, CLifeActivity) {
    return axios.put(API_URL + `editComLifeActivity/${activityID}`, { headers: authHeader(),
      activityName: CLifeActivity.activityName,
      activityDate: CLifeActivity.activityDate,
      activityDescription: CLifeActivity.activityDescription,
      activityPrice: CLifeActivity.activityPrice
    });
  }
  //delete a community life activity
  deleteCommunityLifeActivity(activityID) {
    return axios.delete(API_URL + `deleteComLifeActivity/${activityID}` , { headers: authHeader() });
  }

}

export default new ActivityService();