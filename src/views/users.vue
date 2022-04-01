<template>
  <div class="bootstrap_datatables">
  <div class="container py-5">
    <header class="text-center text-black">
      <h1 class="display-4">User Accounts Management</h1>
    </header>
    <div class="row py-5">
      <div class="col-lg-10 mx-auto">
        <div class="card rounded shadow border-0">
          <div class="card-body p-5 bg-white rounded">

            <h3 v-if="errorMsg">{{ errorMsg }}</h3>
            <div class="table-responsive">
              <table style="width:100%" class="table table-striped table-bordered">
                <thead>
                  <tr>
                    <th>Username</th>
                    <th>Unit #</th>
                    <th>Phone #</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  <tr v-for="user in users" :key="user.id">
                    <td> {{ user.username }} </td>
                    <td> {{ user.unitNumber }} </td>
                    <td> {{ user.phoneNumber }} </td>
                    <td>
                      <button v-if="hasPrivilege" class="btn btn-primary" @click="editAccount(user.id)"> Edit </button>
                      <button v-if="hasPrivilege" class="btn btn-danger" @click="deleteAccount(user.id)"> Delete </button>
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
import AdminService from "../services/admin.service";

export default {
  name: "Users",
  data() {
    return {
      users: [],
      numberOfUsers:0,
      errorMsg: '',
    };
  },
  methods: {
    getUsers(){
      AdminService.getAllUsers().then(response => {
        this.users = response.data;
        console.log(response);
        this.numberOfUsers= this.users.count;
        console.log(this.numberOfUsers);

      })
      .catch((error) => {
        console.log(error);
        this.errorMsg = 'Error retrieving data';
      })
    },
    editAccount(userId){
        this.$router.push('/editAccount/'+userId)
      
      .catch((error) => {
        console.log(error);
        this.errorMsg = 'Error retrieving data';
      })      
    },
    deleteAccount(userId){
      AdminService.deleteAccount(userId).then(response => {
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
    this.getUsers();
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
