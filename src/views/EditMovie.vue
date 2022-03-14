<template>
  <div class="col-md-12">
    <div class="card card-container">
      <br><br>
      <h3 class="mx-auto"> Editing "{{currentMovie.movieName}}"</h3>
      <br /><br /><br />
      <div class="col-md-12">
        <div class="card card-container">
          <Form @submit="editMovie" :validation-schema="schema">
            <div v-if="!successful">
              <div class="form-group">
                <label for="movieName">Movie Name</label>
                <Field name="movieName" type="text" class="form-control" v-model="currentMovie.movieName"/>
                <ErrorMessage name="movieName" class="error-feedback" />
              </div>
              <div class="form-group">
                <label for="movieDate">Movie Date</label>
                <Field name="movieDate" type="Date" class="form-control" v-model="currentMovie.movieDate"/>
                <ErrorMessage name="movieDate" class="error-feedback" />
              </div>
              <div class="form-group">
                <label for="movieDescription">Movie Description</label>
                <Field name="movieDescription" type="text" class="form-control" v-model="currentMovie.movieDescription"/>
                <ErrorMessage name="movieDescription" class="error-feedback" />
              </div>

              <div class="form-group">
                <button class="btn btn-primary btn-block" :disabled="loading">
                  <span v-show="loading"
                    class="spinner-border spinner-border-sm">
                  </span>
                  Edit Selected Movie
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
    </div>
  </div>
</template>

<script>
import MovieService from "../services/commLifeMovie.service";
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
//use yup to handle input validation before user submission
export default {
  name: "editMovie",
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
      currentMovie: [],
      successful: false,
      loading: false,
      message: "",
      schema,
    };
  },
  methods: {
    //error message if anything goes wrong, otherwise submit movie and return success message.
    getMovie(movieID) {
      MovieService.getCommunityLifeMovie(movieID)
      .then(response => {
          this.currentMovie = response.data;
          console.log(this.currentMovie);
        })
        .catch(e => {
          console.log(e);
        });
    },
    editMovie(currentMovie) {
      this.message = "";
      this.successful = false;
      this.loading = true;
      MovieService.editCommunityLifeMovie(this.$route.params.id, currentMovie)
        .then((data) => {
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
      this.$router.go()
    },
  },
  mounted() {
    this.getMovie(this.$route.params.id);
  }
};
</script>


