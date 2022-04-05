<template>
    <header class="jumbotron">
      <h3 class="text-center"> <strong> Personal Profile </strong> </h3>
    </header>
    <!-- <p> <strong>Token:</strong>
      {{currentUser.accessToken.substring(0, 20)}} ... {{currentUser.accessToken.substr(currentUser.accessToken.length - 20)}}
    </p> -->

    <div class="container rounded bg-white mt-5 mb-5">
      <div class="row">
          <div class="col-md-3 border-right">
              <!-- <div class="d-flex flex-column align-items-center text-center p-3 py-5">
                <img class="rounded-circle mt-5 img-thumbnail" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png">
                  <span class="font-weight-bold">Jack</span>
                  <span class="text-black-50">amelly12@bbb.com</span>                
              </div> -->
          </div>
          <div class="col-md-5 border-right">
              <div class="p-3 py-5">
                  <div class="d-flex justify-content-between align-items-center mb-3">
                  </div>
                    <div class="row mt-3">
                      <div class="col-md-12">
                        <label for="username">Username</label>
                        <Field name="username" type="text" class="form-control" v-model="userInfo.username"/>
                        <ErrorMessage name="username" class="error-feedback" />
                      </div>
                      <div class="col-md-12">
                        <label for="email">Email</label>
                        <Field name="email" type="email" class="form-control" v-model="userInfo.email"/>
                        <ErrorMessage name="email" class="error-feedback" />
                      </div>
                      <div class="col-md-12">
                        <label for="phoneNumber">Phone Number</label>
                        <Field name="phoneNumber" type="number" class="form-control" v-model="userInfo.phoneNumber"/>
                        <ErrorMessage name="phoneNumber" class="error-feedback" />
                      </div>
                      <div v-if="!hasPrivilege" class="col-md-12">
                        <label for="unitNumber">Unit Number</label>
                        <Field name="unitNumber" type="number" class="form-control" v-model="userInfo.unitNumber"/>
                        <ErrorMessage name="unitNumber" class="error-feedback" />
                      </div> 
                      <div class="col-md-12">
                        <label for="role">Authorities</label>
                        <Field name="role" type="text" class="form-control" v-model="userInfo.role"/>
                        <ErrorMessage name="role" class="error-feedback" />
                      </div>                                                        
                  </div>
                      <div v-if="message" class="alert" :class="successful ? 'alert-success' : 'alert-danger'">
                          {{ message }}
                      </div>
                   <div class="mt-5 text-center"><a class="btn btn-primary profile-button" type="button" href="editProfile">Edit Profile</a></div>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import UserService from "../services/user.service";
import { Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
//use yup to handle input validation before user submission
export default {
  name: "userProfile",
  components: {
    Field,
    ErrorMessage,
  },
  data() {
    const schema = yup.object().shape({
      username: yup
        .string()
        .required("Username is required!")
        .min(3, "Must be at least 3 characters!")
        .max(20, "Must be maximum 20 characters!"),
      email: yup
        .string()
        .required("Email is required!")
        .email("Email is invalid!")
        .max(50, "Must be maximum 50 characters!"),
      phoneNumber: yup
        .number()
        .required("Phone Number is required!"),
      unitNumber: yup
        .number()
        .required("Unit Number is required!"),
    });

    return {
      userInfo: [],
      successful: false,
      loading: false,
      message: "",
      schema,
    };
  },
  methods: {
    //error message if anything goes wrong, otherwise submit activity and return success message.
    getUser(id) {
      UserService.getMyProfile(id)
      .then(response => {
          this.userInfo = response.data;
          console.log(this.$id);
        })
        .catch(e => {
          console.log(e);
        });
    },
    
  },
  mounted() {
    this.getUser(this.currentUser.id);
  
  },  //return user if one is logged in
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