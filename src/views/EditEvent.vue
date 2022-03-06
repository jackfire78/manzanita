<template>
  <div class="col-md-12">
    <div class="card card-container">
      <img
        id="profile-img"
        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
        class="profile-img-card"
      />
      <Form @submit="createEvent" :validation-schema="schema">
        <div v-if="!successful">
          <div class="form-group">
            <label for="username">Username</label>
            <Field name="username" type="text" class="form-control" />
            <ErrorMessage name="username" class="error-feedback" />
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <Field name="email" type="email" class="form-control" />
            <ErrorMessage name="email" class="error-feedback" />
          </div>
          <div class="form-group">
            <label for="phoneNumber">Phone Number</label>
            <Field name="phoneNumber" type="text" class="form-control" />
            <ErrorMessage name="phoneNumber" class="error-feedback" />
          </div>
          <div class="form-group">
            <label for="unitNumber">Unit Number</label>
            <Field name="unitNumber" type="text" class="form-control" />
            <ErrorMessage name="unitNumber" class="error-feedback" />
          </div>
          <div class="form-group">
            <label for="role">Role</label>
            <Field name="role" type="text" class="form-control" />
            <ErrorMessage name="role" class="error-feedback" />
          </div>

          <div class="form-group">
            <button class="btn btn-primary btn-block" :disabled="loading">
              <span
                v-show="loading"
                class="spinner-border spinner-border-sm"
              ></span>
              Sign Up
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
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
//use yup to handle input validation before user submission
export default {
  name: "createEvent",
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
  computed: {    //
    
  },

  methods: {        //error message if anything goes wrong, otherwise submit user and return success message. 
    createEvent(event) {
      this.message = "";
      this.successful = false;
      this.loading = true;

      this.$store.dispatch("auth/createEvent", event).then(
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