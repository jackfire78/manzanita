<template>
  <div class="bootstrap_datatables">
  <div class="container py-5">
    <header class="text-center text-black">
      <h1 class="display-4">Clubs</h1>
    </header>
    <div class="row py-5">
      <div class="col-lg-10 mx-auto">
        <div class="card rounded shadow border-0">
          <div class="card-body p-5 bg-white rounded">
            <a v-if="hasPrivilege" class="btn btn-info btn-sm" role="button">
              <router-link to="/" class="nav-link text-white">Create Club</router-link>
            </a>


            <div class="table-responsive">
              <table style="width:100%" class="table table-striped table-bordered">
                <thead>
                  <tr>
                    <th>Club Name</th>
                    <th>Description</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>

                  <tr v-for="club in Clubs" :key="club.clubID">
                    <td> {{ club.clubName }} </td>
                    <td> {{ club.clubDescription }} </td>
                    <td>
                      <button v-if="currentUser" class="btn btn-success" @click="joinClub(club)"> Join </button>
                      <button v-if="hasPrivilege" class="btn btn-primary" @click="editClub(club)"> Edit </button>
                      <button v-if="hasPrivilege" class="btn btn-danger" @click="deleteClub(club)"> Delete </button>
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
import ClubService from "../services/commLifeClub.service";

export default {
  name: "Clubs",
  data() {
    return {
      clubs: [],
      numberOfClubs:0,
      errorMsg: '',
    };
  },
  methods: {
    getClubs(){
      ClubService.getCommunityLifeClub().then(response => {
        this.clubs = response.data;
        console.log(response);
        this.numberOfClubs= this.clubs.count;
        console.log(this.numberOfClubs);

      })
      .catch((error) => {
        console.log(error);
        this.errorMsg = 'Error retrieving data';
      })
    },
    editClub(clubId){
        this.$router.push('/editClub/'+clubId)
      
      .catch((error) => {
        console.log(error);
        this.errorMsg = 'Error retrieving data';
      })      
    },
    deleteClub(clubId){
      ClubService.deleteCommunityLifeClub(clubId).then(response => {
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
    this.getClubs();
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
