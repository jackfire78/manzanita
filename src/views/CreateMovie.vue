<template>
<br><br><br><br><br>
  <div class="col-md-12">
    <div class="card card-container">
      <Form @submit="createMovie" :validation-schema="schema">
        <div v-if="!successful">
          <div class="form-group">
            <label for="movieName">Movie Name</label>
            <Field name="movieName" type="text" class="form-control" />
            <ErrorMessage name="movieName" class="error-feedback" />
          </div>
          <div class="form-group">
            <label for="movieDate">Movie Date</label>
            <Field name="movieDate" type="date" class="form-control" />
            <ErrorMessage name="movieDate" class="error-feedback" />
          </div> 
          <div class="form-group">
            <label for="movieDescription">Movie Description</label>
            <Field name="movieDescription" type="text" class="form-control" />
            <ErrorMessage name="movieDescription" class="error-feedback" />
          </div>

          <div class="form-group">
            <button class="btn btn-primary btn-block" :disabled="loading">
              <span
                v-show="loading"
                class="spinner-border spinner-border-sm"
              ></span>
              Create Movie
            </button>
          </div>
        </div>
      </Form>

      <div
        v-if="message"
        class="alert"
        :class="successful ? 'alert-success' : 'alert-danger'"
      >
        {{ message }}
      </div>
    </div>
  </div>
</template>

<script>
import MovieService from "../services/commLifeMovie.service";
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
//use yup to handle input validation before user submission
export default {
  name: "createMovie",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const schema = yup.object().shape({     
      movieName: yup
        .string()
        .required("Movie Name is required!")
        .min(3, "Must be at least 3 characters!")
        .max(20, "Must be maximum 20 characters!"),
      movieDate: yup
        .date()
        .required("Date is required!"),
      movieDescription: yup
        .string()
        .required("Description is required!")
        .min(6, "Must be at least 6 characters!")
        .max(500, "Must be maximum 500 characters!"),
    });

    return {
      successful: false,
      loading: false,
      message: "",
      schema,
    };
  },
  methods: {        //error message if anything goes wrong, otherwise submit movie and return success message. 
    createMovie(movie) {
      this.message = "";
      this.successful = false;
      this.loading = true;
      console.log(movie);
      // ------ FIX PROBLEM HERE!!!    -----------
      MovieService.createCommunityLifeMovie(movie)
        .then((data) => {
          this.message = data.message;
          this.successful = true;
          this.loading = false;
          this.$router.push('/movies');
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
  mounted() {
    if(!this.hasPrivilege){
      this.$router.push('/movies');
    }
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

