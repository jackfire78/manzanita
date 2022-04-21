import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'https://springboot-application-backend.herokuapp.com/api/lifeActivity/';
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

  //retrieve logged in user's community life activities they are attending
  getMyCommunityLifeActivities(userId) {
    return axios.get(API_URL + `myCommunityLifeActivities/${userId}` , { headers: authHeader() })
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

  //join an event
  attendCommunityLifeActivity(activityID, userId) {
    //console.log(userId)
    return axios.put(API_URL + `attendCommunityLifeActivity/${activityID}`, {
      id: userId,
      // username: '',
      // email: '',
      // password: '',
      // phoneNumber: '',
      // unitNumber: '',
      // role: ''
    } ,{ headers: authHeader()
    })
    .catch(error => {console.log(error)});     
  }

  //delete a community event
  leaveCommunityLifeActivity(activityID) {
    return axios.delete(API_URL + 'leaveCommunityLifeActivity/' + activityID , { headers: authHeader() });
  }  
  //delete a community life activity
  deleteCommunityLifeActivity(activityID) {
    return axios.delete(API_URL + `deleteComLifeActivity/${activityID}` , { headers: authHeader() });
  }

}

export default new ActivityService();