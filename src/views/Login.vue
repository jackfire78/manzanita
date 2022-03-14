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

                  <div class="d-flex align-items-center mb-3 pb-1">
                    <i class="fas fa-cubes fa-2x me-3" style="color: #ff6219;"></i>
                    <span class="h1 fw-bold mb-0">Logo</span>
                  </div>

                  <h5 class="fw-normal mb-3 pb-3" style="letter-spacing: 1px;">Sign into your account</h5>

                  <Form @submit="handleLogin" :validation-schema="schema">
                      <div class="form-group form-outline mb-4">
                        <label for="username">Username</label>
                        <Field name="username" type="text" class="form-control" />
                        <ErrorMessage name="username" class="error-feedback" />
                      </div>
                      <div class="form-group form-outline mb-4">
                        <label for="password">Password</label>
                        <Field name="password" type="password" class="form-control" />
                        <ErrorMessage name="password" class="error-feedback" />
                      </div>

                      <div class="form-group pt-1 ">
                        <button class="btn btn-dark btn-lg btn-block" :disabled="loading">
                          <span
                            v-show="loading"
                            class="spinner-border spinner-border-sm"
                          ></span>
                          <span>Login</span>
                        </button>

                        <br>
                        <p class="mb-5 pb-lg-2" style="color: #393f81;">Problems logging in? Contact adminstration for support.</p>

                      </div>

                      <div class="form-group">
                        <div v-if="message" class="alert alert-danger" role="alert">
                          {{ message }}
                        </div>
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
// use yup library to ensure validation is met before submission
export default {
  name: "Login",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const schema = yup.object().shape({
      username: yup.string().required("Username is required!"),
      password: yup.string().required("Password is required!"),
    });

    return {
      loading: false,
      message: "",
      schema,
    };
  },
  computed: {
    loggedIn() {      //get instance of current user  if there is one logged in at the moment 
      return this.$store.state.auth.status.loggedIn;
    },
  },
  created() {           //if logged iun then push to profile
    if (this.loggedIn) {
      this.$router.push("/profile");
    }
  },
  methods: {          //if user logs in successfully then push them towards profile page...otherwise send back error message
    handleLogin(user) {
      this.loading = true;

      this.$store.dispatch("auth/login", user).then(
        () => {
          this.$router.push("/profile");
        },
        (error) => {
          this.loading = false;
          this.message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
        }
      );
    },
  },
};
</script>

<style scoped>
  .profile-img-card {
    align-self:center;
  }
  img {
    width:200px;
    height:200px;
  }
</style>