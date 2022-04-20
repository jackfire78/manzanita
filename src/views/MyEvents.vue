<template>
  <div class="bootstrap_datatables">
  <div class="container py-5">
    <header class="text-center text-black">
      <h1 class="display-4">My Events</h1>
    </header>
    <div class="row py-5">
      <div class="col-lg-10 mx-auto">
        <div class="card rounded shadow border-0">
          <div class="card-body p-5 bg-white rounded">           
            <a v-if="hasPrivilege" class="btn btn-info btn-sm" role="button">
              <router-link to="/createEvent" class="nav-link text-white">Create Event</router-link>
            </a>
            <a v-if="currentUser" class="btn btn-info btn-sm" role="button">
              <router-link to="/events" class="nav-link text-white">All Events</router-link>
            </a>
            <h3 v-if="errorMsg">{{ errorMsg }}</h3>
            <div class="table-responsive">
              <table style="width:100%" class="table table-striped table-bordered">
                <thead>
                  <tr>
                    <th>Event Name</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  
                  <tr v-for="event in events" :key="event.id">
                    <td> {{ event.eventName }} </td>
                    <td>
                      <button v-if="currentUser" class="btn btn-success btn-sm" @click="leaveEvent(event.id)"> Leave </button>

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
import EventService from "../services/event.service";

export default {
  name: "Events",
  data() {
    return {
      events: [],
      numberOfEvents:0,
      errorMsg: '',
    };
  },
  methods: {
    getEvents(){
      EventService.getMyCommunityEvents(this.currentUser.id).then(response => {
        this.events = response.data;
        console.log(response);
        this.numberOfEvents= this.events.count;
        console.log(this.numberOfEvents);

      })
      .catch((error) => {
        console.log(error);
        this.errorMsg = 'Error retrieving events';
      })
    },
    leaveEvent(eventId){
      EventService.leaveCommunityEvent(eventId).then(response => {
        this.events = response.data;
        console.log(response);
        this.$router.push('/events')
      })
      .catch((error) => {
        console.log(error);
        this.errorMsg = 'Error leaving events';
      })
    },
  },
  mounted() {
    this.getEvents();
  },
  //return user if one is logged in
  computed: {
    currentUser() {          //if parameters are met, then there is a current user logged in
      return this.$store.state.auth.user;
    },
    hasPrivilege() {        //if parameters are met, then current user is an admin
      if (this.currentUser && this.currentUser.roles.includes('ROLE_ADMIN')) {
        return this.currentUser.roles.includes('ROLE_ADMIN');
      }
      else if (this.currentUser && this.currentUser.roles.includes('ROLE_MODERATOR')) {
        return this.currentUser.roles.includes('ROLE_MODERATOR');
      }
      return false;
    },
  }
};
</script>
