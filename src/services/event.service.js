import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/communityEvents/';
//service used for accessing events data
class EventService {

  //any requests of authorized resources must contain an HTTP header 
 //create a new event
  createCommunityEvent(communityEvents) {
    //post data given at creating a new event.
    return axios.post(API_URL + 'createCommunityEvent', { headers: authHeader(),
      eventName: communityEvents.eventName,
      eventDescription: communityEvents.eventDescription,
      eventPicture: communityEvents.eventPicture,
      eventPrice: communityEvents.eventPrice,
      eventDate: communityEvents.eventDate,
      eventPresenters: communityEvents.eventPresenters
    });
  }

  //retrieve all events
  getAllEvents() {
    return axios.get(API_URL + 'allCommunityEvents', { headers: authHeader() })
  }

  //retrieve a single community event
  getCommunityEvent(eventID) {
    return axios.get(API_URL + 'getCommunityEvent/' + eventID , { headers: authHeader() })
    .then(response => response.data);
  }

  //edit an event
  editCommunityEvent(communityEvents) {
    return axios.put(API_URL + 'editCommunityEvent' + communityEvents.eventID, { headers: authHeader(),
      eventName: communityEvents.eventName,
      eventDescription: communityEvents.eventDescription,
      eventPicture: communityEvents.eventPicture,
      eventPrice: communityEvents.eventPrice,
      eventDate: communityEvents.eventDate,
      eventPresenters: communityEvents.eventPresenters
    });
  }

  //delete a community event
  deleteCommunityEvent(eventID) {
    return axios.delete(API_URL + 'deleteCommunityEvent/' + eventID , { headers: authHeader() });
  }

}

export default new EventService();