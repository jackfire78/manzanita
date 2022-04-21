import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'https://springboot-application-backend.herokuapp.com/api/lifeMovie/';
//service used for accessing movie data
class MovieService {

  //any requests of authorized resources must contain an HTTP header 
 //create a new community life movie
  createCommunityLifeMovie(CLifeMovie) {
    //post data given at creating a new movie.
    return axios.post(API_URL + 'createLifeMovie', { headers: authHeader(),
      movieName: CLifeMovie.movieName,
      movieDate: CLifeMovie.movieDate,
      movieDescription: CLifeMovie.movieDescription,
    });
  }

  //retrieve all movies
  getAllMovies() {
    return axios.get(API_URL + 'allComLifeMovies', { headers: authHeader() })
  }

  //retrieve a single community life movie
  getCommunityLifeMovie(movieID) {
    return axios.get(API_URL + `getComLifeMovie/${movieID}` , { headers: authHeader() })
  }

  //retrieve all movies current user is attending
  getMyCommunityLifeMovies(userId) {
    return axios.get(API_URL + `getMyComLifeMovies/${userId}` , { headers: authHeader() })
  }

  //edit an movie
  editCommunityLifeMovie(movieID, CLifeMovie) {
    return axios.put(API_URL + `editComLifeMovie/${movieID}`, { headers: authHeader(),
      movieName: CLifeMovie.movieName,
      movieDate: CLifeMovie.movieDate,
      movieDescription: CLifeMovie.movieDescription,
    });
  }

  //attend a movie
  attendCommunityLifeMovie(movieID, userId) {
    //console.log(userId)
    return axios.put(API_URL + `attendCommunityLifeMovie/${movieID}`, {
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

  //delete a community life movie that current user is attending
  leaveCommunityLifeMovie(movieID) {
    return axios.delete(API_URL + 'leaveCommunityLifeMovie/' + movieID , { headers: authHeader() });
  }

  //delete a community life movie
  deleteCommunityLifeMovie(movieID) {
    return axios.delete(API_URL + `deleteComLifeMovie/${movieID}`, { headers: authHeader() });
  }

}

export default new MovieService();