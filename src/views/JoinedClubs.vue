<template>
  <div class="bootstrap_datatables">
  <div class="container py-5">
    <header class="text-center text-black">
      <h1 class="display-4">Joined Clubs</h1>
    </header>
    <div class="row py-5">
      <div class="col-lg-10 mx-auto">
        <div class="card rounded shadow border-0">
          <div class="card-body p-5 bg-white rounded">
            <a v-if="hasPrivilege" class="btn btn-info btn-sm" role="button">
              <router-link to="/createClub" class="nav-link text-white">Create Club</router-link>
            </a>
            <a v-if="currentUser" class="btn btn-info btn-sm" role="button">
              <router-link to="/clubs" class="nav-link text-white">All Clubs</router-link>
            </a>
            <h3 v-if="errorMsg">{{ errorMsg }}</h3>
            <div class="table-responsive">
              <table style="width:100%" class="table table-striped table-bordered">
                <thead>
                  <tr>
                    <th>Club Name</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>

                  <tr v-for="club in clubs" :key="club.id">
                    <td> {{ club.clubName }} </td>
                    <td>
                      <button v-if="currentUser" class="btn btn-success" @click="leaveClub(club.id)"> Leave </button>

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
      ClubService.getMyCommunityLifeClubs(this.currentUser.id).then(response => {
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
    leaveClub(clubId){
      ClubService.leaveCommunityLifeClub(clubId).then(response => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
        this.errorMsg = 'Error leaving club';
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
