<template>
  <div class="bootstrap_datatables">
  <div class="container py-5">
    <header class="text-center text-black">
      <h1 class="display-4">Work Orders</h1>
    </header>
    <div class="row py-5">
      <div class="col-lg-10 mx-auto">
        <div class="card rounded shadow border-0">
          <div class="card-body p-5 bg-white rounded">
            <a v-if="hasPrivilege" class="btn btn-info btn-sm" role="button">
              <router-link to="/createWorkOrder" class="nav-link text-white">Create Work Order</router-link>
            </a>

            <h3 v-if="errorMsg">{{ errorMsg }}</h3>
            <div class="table-responsive">
              <table style="width:100%" class="table table-striped table-bordered">
                <thead>
                  <tr>
                    <th>Resident Name</th>
                    <th>Resident Unit</th>
                    <th>Severity</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>

                  <tr v-for="workOrder in workOrders" :key="workOrder.id">
                    <td> {{ workOrder.residentName }} </td>
                    <td> {{ workOrder.residentUnit }} </td>
                    <td> {{ workOrder.severity }} </td>
                    <td> {{ workOrder.status }} </td>
                    <td>
                      <button v-if="currentUser" class="btn btn-success" @click="editWorkOrder(workOrder.id)"> Edit </button>
                      <button v-if="hasPrivilege" class="btn btn-danger" @click="deleteWorkOrder(workOrder.id)"> Delete </button>
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
import MaintenanceService from "../services/maintenance.service";

export default {
  name: "WorkOrders",
  data() {
    return {
      workOrders: [],
      numberOfWorkOrders:0,
      errorMsg: '',
    };
  },
  methods: {
    //get all work orders
    getWorkOrders(){
      MaintenanceService.getWorkOrders().then(response => {
        this.workOrders = response.data;
        console.log(response);
        this.numberOfWorkOrders= this.workOrders.count;
        console.log(this.numberOfWorkOrders);

      })
      .catch((error) => {
        console.log(error);
        this.errorMsg = 'Error retrieving data';
      })
    },
    //get only work orders of currently logged in user
    getMyWorkOrders(){
      MaintenanceService.getMyWorkOrders().then(response => {
        this.workOrders = response.data;
        console.log(response);
        this.numberOfWorkOrders= this.workOrders.count;
        console.log(this.numberOfWorkOrders);
      })
      .catch((error) => {
        console.log(error);
        this.errorMsg = 'Error retrieving data';
      })
    },
    editWorkOrder(workOrderId){
        this.$router.push('/editWorkOrder/'+workOrderId)
      
      .catch((error) => {
        console.log(error);
        this.errorMsg = 'Error retrieving data';
      })      
    },
    deleteWorkOrder(workOrderId){
      MaintenanceService.deleteWorkOrder(workOrderId).then(response => {
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
    if(this.hasPrivilege){
      this.getWorkOrders();
    }else if(this.currentUser){
      this.getMyWorkOrders();
    }
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
