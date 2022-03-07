<template>
  <div class="bootstrap_datatables">
  <div class="container py-5">
    <header class="text-center text-black">
      <h1 class="display-4">Activities</h1>
    </header>
    <div class="row py-5">
      <div class="col-lg-10 mx-auto">
        <div class="card rounded shadow border-0">
          <div class="card-body p-5 bg-white rounded">
            <a v-if="hasPrivilege" class="btn btn-info btn-sm" role="button">
              <router-link to="/" class="nav-link text-white">Create Activity</router-link>
            </a>

            <h3 v-if="errorMsg">{{ errorMsg }}</h3>
            <div class="table-responsive">
              <table style="width:100%" class="table table-striped table-bordered">
                <thead>
                  <tr>
                    <th>Activity Name</th>
                    <th>Date</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>

                  <tr v-for="activity in Activities" :key="activity.id">
                    <td> {{ activity.activityName }} </td>
                    <td> {{ activity.activityDate }} </td>
                    <td> {{ activity.activityDescription }} </td>
                    <td> {{ activity.activityPrice }} </td>
                    <td>
                      <button v-if="currentUser" class="btn btn-success" @click="joinActivity(activity.id)"> Join </button>
                      <button v-if="hasPrivilege" class="btn btn-primary" @click="editActivity(activity.id)"> Edit </button>
                      <button v-if="hasPrivilege" class="btn btn-danger" @click="deleteActivity(activity.id)"> Delete </button>
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
import ActivityService from "../services/commLifeActivity.service";

export default {
  name: "Activities",
  data() {
    return {
      activities: [],
      numberOfActivities:0,
      errorMsg: '',
    };
  },
  methods: {
    getActivities(){
      ActivityService.getAllActivities().then(response => {
        this.activities = response.data;
        console.log(response);
        this.numberOfActivities= this.activities.count;
        console.log(this.numberOfActivities);

      })
      .catch((error) => {
        console.log(error);
        this.errorMsg = 'Error retrieving data';
      })
    },
    editActivity(activityId){
        this.$router.push('/editActivity/'+activityId)
      
      .catch((error) => {
        console.log(error);
        this.errorMsg = 'Error retrieving data';
      })      
    },
    deleteActivity(activityId){
      ActivityService.deleteCommunityLifeActivity(activityId).then(response => {
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
    this.getActivities();
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
