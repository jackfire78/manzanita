import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/test/';
//service used for accessing movie data
class MovieService {

  //any requests of authorized resources must contain an HTTP header 
 //create a new community life movie
  createCommunityLifeMovie(CLifeMovie) {
    //post data given at creating a new movie.
    return axios.post(API_URL + 'createCLifeMovie', { headers: authHeader(),
      movieName: CLifeMovie.movieName,
      movieDate: CLifeMovie.movieDate,
      movieDescription: CLifeMovie.movieDescription,
    });
  }

  //retrieve all movies
  getAllMovies() {
    return axios.get(API_URL + 'allCLifeMovie', { headers: authHeader() })
    .then(response => response.data);
  }

  //retrieve a single community life movie
  getCommunityLifeMovie(movieID) {
    return axios.get(API_URL + 'getCLifeMovie/' + movieID , { headers: authHeader() })
    .then(response => response.data);
  }

  //edit an movie
  editCommunityLifeMovie(CLifeMovie) {
    return axios.put(API_URL + 'editCLifeMovie' + CLifeMovie.movieID, { headers: authHeader(),
      movieName: CLifeMovie.movieName,
      movieDate: CLifeMovie.movieDate,
      movieDescription: CLifeMovie.movieDescription,
    });
  }
  //delete a community life movie
  deleteCommunityLifeMovie(movieID) {
    return axios.delete(API_URL + 'deleteCLifeMovie/' + movieID , { headers: authHeader() });
  }

}

export default new MovieService();