import axios from 'axios';
import authHeader from './auth-header';

//const API_URL = 'http://localhost:8080/api/communityEvents/';
const API_URL = 'jackfire78/manzanitaResidentualCommunities/api/communityEvents/';

//service used for accessing events data
class EventService {

  //any requests of authorized resources must contain an HTTP header 
  //create a new event
  createCommunityEvent(event) {
    //post data given at creating a new event.
    return axios.post(API_URL + 'createCommunityEvent', { headers: authHeader(),
      eventName: event.eventName,
      eventDescription: event.eventDescription,
      eventPicture: event.eventPicture,
      eventPrice: event.eventPrice,
      eventDate: event.eventDate,
      eventPresenters: event.eventPresenters
    });
  }

  //retrieve all events
  getAllEvents() {
    return axios.get(API_URL + 'allCommunityEvents', { headers: authHeader() })
  }

  //retrieve a single community event
  getCommunityEvent(eventId) {
    return axios.get(API_URL + `getCommunityEvent/${eventId}` , { headers: authHeader() });
  }

  //edit an event
  editCommunityEvent(eventId, event) {
    return axios.put(API_URL + `editCommunityEvent/${eventId}`, { headers: authHeader(),
      eventName: event.eventName,
      eventDescription: event.eventDescription,
      eventPicture: event.eventPicture,
      eventPrice: event.eventPrice,
      eventDate: event.eventDate,
      eventPresenters: event.eventPresenters
    })
    .catch(error => {console.log(error)});     
  }

  //delete a community event
  deleteCommunityEvent(eventID) {
    return axios.delete(API_URL + 'deleteCommunityEvent/' + eventID , { headers: authHeader() });
  }

}

export default new EventService();