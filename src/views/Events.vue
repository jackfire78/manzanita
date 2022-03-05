<template>
  <div class="bootstrap_datatables">
  <div class="container py-5">
    <header class="text-center text-black">
      <h1 class="display-4">Events</h1>
    </header>
    <div class="row py-5">
      <div class="col-lg-10 mx-auto">
        <div class="card rounded shadow border-0">
          <div class="card-body p-5 bg-white rounded">
            <div class="table-responsive">
              <table style="width:100%" class="table table-striped table-bordered">
                <thead>
                  <tr>
                    <th>Event Name</th>
                    <th>Price</th>
                    <th>Date</th>
                    <th>Presenters</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>

                  <tr v-for="event in events" :key="event.eventID">
                    <td> {{ event.eventName }} </td>
                    <td> {{ event.eventPrice }} </td>
                    <td> {{ event.eventDate }} </td>
                    <td> {{ event.eventPresenters }} </td>
                    <td>
                      <button v-if="currentUser" class="btn btn-success" @click="joinEvent(event)"> Join </button>
                      <button v-if="hasPrivilege" class="btn btn-primary" @click="editEvent(event)"> Edit </button>
                      <button v-if="hasPrivilege" class="btn btn-danger" @click="deleteEvent(event)"> Delete </button>
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
  name: "eventsList",
  data() {
    return {
      events: [],
      numberOfEvents:0,
    };
  },
  mounted() {
    EventService.getAllEvents().then(
      (data) => {
        this.events = data.data;
        this.numberOfEvents= data.count;
      },
      (error) => {
        this.content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
      }
    );
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
