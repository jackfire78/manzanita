<template>
  <div class="bootstrap_datatables">
  <div class="container py-5">
    <header class="text-center text-black">
      <h1 class="display-4">Movies</h1>
    </header>
    <div class="row py-5">
      <div class="col-lg-10 mx-auto">
        <div class="card rounded shadow border-0">
          <div class="card-body p-5 bg-white rounded">
            <a v-if="hasPrivilege" class="btn btn-info btn-sm" role="button">
              <router-link to="/createMovie" class="nav-link text-white">Add Movie</router-link>
            </a>
            <a v-if="currentUser" class="btn btn-info btn-sm" role="button">
              <router-link to="/myMovies" class="nav-link text-white">My Movies</router-link>
            </a>
            <div class="table-responsive">
              <table style="width:100%" class="table table-striped table-bordered">
                <thead>
                  <tr>
                    <th>Movie Name</th>
                    <th>Date</th>
                    <th>Description</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>

                  <tr v-for="movie in movies" :key="movie.id">
                    <td> {{ movie.movieName }} </td>
                    <td> {{ movie.movieDate }} </td>
                    <td> {{ movie.movieDescription }} </td>
                    <td>
                      <button v-if="currentUser" class="btn btn-success" @click="attendMovie(movie.id)"> Attend </button>
                      <button v-if="hasPrivilege" class="btn btn-primary" @click="editMovie(movie.id)"> Edit </button>
                      <button v-if="hasPrivilege" class="btn btn-danger" @click="deleteMovie(movie.id)"> Delete </button>
                    </td>
                  </tr>

                </tbody>

              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import MovieService from "../services/commLifeMovie.service";

export default {
  name: "Movies",
  data() {
    return {
      movies: [],
      numberOfMovies:0,
      errorMsg: '',
    };
  },
  methods: {
    getMovies(){
      MovieService.getAllMovies().then(response => {
        this.movies = response.data;
        console.log(response);
        this.numberOfMovies= this.movies.count;
        console.log(this.numberOfMovies);

      })
      .catch((error) => {
        console.log(error);
        this.errorMsg = 'Error retrieving data';
      })
    },
    editMovie(movieId){
        this.$router.push('/editMovie/'+movieId)
      
      .catch((error) => {
        console.log(error);
        this.errorMsg = 'Error retrieving data';
      })      
    },
    attendMovie(movieId){
      MovieService.attendCommunityLifeMovie(movieId, this.currentUser.id).then(response => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
        this.errorMsg = 'Error attending movie';
      })
      //this.$router.go()
    },
    deleteMovie(movieId){
      MovieService.deleteCommunityLifeMovie(movieId).then(response => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
        this.errorMsg = 'Error deleting data';
      })
      this.$router.go()
    },
  },
  mounted() {
    this.getMovies();
  },
  //return user if one is logged in
  computed: {
    currentUser() {          //if parameters are met, then there is a current user logged in
      return this.$store.state.auth.user;
    },
    hasPrivilege() {        //if parameters are met, then current user is an admin
      if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes('ROLE_ADMIN');
      }
      else if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes('ROLE_MODERATOR');
      }

      return false;
    },
  }
};
</script>
