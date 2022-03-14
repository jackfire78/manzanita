<template>
  <br><br><br>
  <section class="h-auto w-auto" style="background-color: #4D545D;">
    <div class="container py-5 h-auto ">
      <div class="row d-flex justify-content-center h-auto">
        <div class="col col-xl-6 ">
          <div class="card" style="border-radius: 1rem;">
            <div class="row g-0">
              <div class="col-md-2 col-lg-10 d-flex">
                <div class="card-body p-4 p-lg-5 text-black">

                  <form>

                    <h5 class="fw-normal mb-3 pb-3" style="letter-spacing: 1px;">Register a new account</h5>

                    <Form @submit="handleRegister" :validation-schema="schema">
                      <div v-if="!successful">
                        <div class="form-group">
                          <label for="username">Username</label>
                          <Field name="username" type="text" class="form-control" placeholder="ex: Sam Smith"/>
                          <ErrorMessage name="username" class="error-feedback" />
                        </div>
                        <div class="form-group">
                          <label for="email">Email</label>
                          <Field name="email" type="email" class="form-control" placeholder="ex: test@email.com"/>
                          <ErrorMessage name="email" class="error-feedback" />
                        </div>
                        <div class="form-group">
                          <label for="password">Password</label>
                          <Field name="password" type="password" class="form-control" placeholder=""/>
                          <ErrorMessage name="password" class="error-feedback" />
                        </div>
                        <div class="form-group">
                          <label for="phoneNumber">Phone Number</label>
                          <Field name="phoneNumber" type="text" class="form-control" placeholder="10 digit number. No special characters"/>
                          <ErrorMessage name="phoneNumber" class="error-feedback" />
                        </div>
                        <div class="form-group">
                          <label for="unitNumber">Unit Number</label>
                          <Field name="unitNumber" type="text" class="form-control" placeholder="2 - 5 digit number"/>
                          <ErrorMessage name="unitNumber" class="error-feedback" />
                        </div>
                        <div class="form-group">
                          <label for="role">Role</label>
                          <Field name="role" type="text" class="form-control" placeholder="Pick one 'User', 'Mod','Admin'" />
                          <ErrorMessage name="role" class="error-feedback" />
                        </div>

                          <br>
                          <p class="mb-5 pb-lg-2" style="color: #393f81;">Problems registering? Contact maintenance for support.</p>

                        </div>

                        <div class="form-group">
                          <div v-if="message" class="alert alert-danger" role="alert">
                            {{ message }}
                          </div>
                        </div>

                        <div class="form-group">
                          <button class="btn btn-primary btn-block" :disabled="loading">
                            <span
                              v-show="loading"
                              class="spinner-border spinner-border-sm"
                            ></span>
                            Register Account
                          </button>
                        </div>
                      </Form>
                  </form>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
//use yup to handle input validation before user submission
export default {
  name: "Register",
  components: {
    Form,
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
      password: yup
        .string()
        .required("Password is required!")
        .min(6, "Must be at least 6 characters!")
        .max(40, "Must be maximum 40 characters!"),
      email: yup
        .string()
        .required("Email is required!")
        .email("Email is invalid!")
        .max(50, "Must be maximum 50 characters!"),
      phoneNumber: yup
        .string()
        .required("Phone # is required!")
        .min(10, "Must be 10 Numbers!")
        .max(10, "Must be 10 Numbers!"),
      unitNumber: yup
        .string()
        .required("Unit # is required!")
        .min(1, "Must be at least 1 number!")
        .max(5, "Must be at most 5 numbers!"),
      role: yup
        .string()
        .required("Role is required!")
        .min(3, "Must be at least 3 characters!")
        .max(25, "Must be maximum 25 characters!"),
    });

    return {
      successful: false,
      loading: false,
      message: "",
      schema,
    };
  },
  computed: {    //used with below commented method to push to profile is user is currently logged in (since only admins can create accounts, we will not force this method at the moment)
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  // mounted() {
  //   if (this.loggedIn) {
  //     this.$router.push("/profile");
  //   }
  // },
  methods: {        //error message if anything goes wrong, otherwise submit user and return success message. 
    handleRegister(user) {
      this.message = "";
      this.successful = false;
      this.loading = true;

      this.$store.dispatch("auth/register", user).then(
        (data) => {
          this.message = data.message;
          this.successful = true;
          this.loading = false;
        },
        (error) => {
          this.message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          this.successful = false;
          this.loading = false;
        }
      );
    },
  },
};
</script>

<style scoped>
  .profile-img-card {
    text-align:center;
  }
  img {
    width:200px;
    height:200px;
  }
</style>