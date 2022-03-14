<template>
<br><br><br><br><br>
  <div class="col-md-12">
    <div class="card card-container">
      <Form @submit="createClub" :validation-schema="schema">
        <div v-if="!successful">
          <div class="form-group">
            <label for="clubName">Club Name</label>
            <Field name="clubName" type="text" class="form-control" />
            <ErrorMessage name="clubName" class="error-feedback" />
          </div>
            <div class="form-group">
            <label for="clubDescription">Club Description</label>
            <Field name="clubDescription" type="text" class="form-control" />
            <ErrorMessage name="clubDescription" class="error-feedback" />
          </div>

          <div class="form-group">
            <button class="btn btn-primary btn-block" :disabled="loading">
              <span
                v-show="loading"
                class="spinner-border spinner-border-sm"
              ></span>
              Create Club
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
import ClubService from "../services/commLifeClub.service";
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
      clubName: yup
        .string()
        .required("Club Name is required!")
        .min(3, "Must be at least 3 characters!")
        .max(20, "Must be maximum 20 characters!"),
      clubDescription: yup
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
  methods: {        //error message if anything goes wrong, otherwise submit event and return success message. 
    createClub(club) {
      this.message = "";
      this.successful = false;
      this.loading = true;
      console.log(club);
      // ------ FIX PROBLEM HERE!!!    -----------
      ClubService.createCommunityLifeClub(club)
        .then((data) => {
          this.message = data.message;
          this.successful = true;
          this.loading = false;
          this.$router.push('/clubs');
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