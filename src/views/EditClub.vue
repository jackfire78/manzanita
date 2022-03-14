<template>
  <div class="col-md-12">
    <div class="card card-container">
      <br><br>
      <h3 class="mx-auto"> Editing "{{currentClub.clubName}}"</h3>
      <br /><br /><br />
      <div class="col-md-12">
        <div class="card card-container">
          <Form @submit="editClub" :validation-schema="schema">
            <div v-if="!successful">

              <div class="form-group">
                <label for="clubName">Club Name</label>
                <Field name="clubName" type="text" class="form-control" v-model="currentClub.clubName"/>
                <ErrorMessage name="clubName" class="error-feedback" />
              </div>
              <div class="form-group">
              <div class="form-group">
                <label for="clubDescription">Club Description</label>
                <Field name="clubDescription" type="text" class="form-control" v-model="currentClub.clubDescription"/>
                <ErrorMessage name="clubDescription" class="error-feedback" />
              </div>

              <div class="form-group">
                <button class="btn btn-primary btn-block" :disabled="loading">
                  <span v-show="loading"
                    class="spinner-border spinner-border-sm">
                  </span>
                  Edit Selected Club
                </button>
              </div>
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
import ClubService from "../services/commLifeClub.service";
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
//use yup to handle input validation before user submission
export default {
  name: "editClub",
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
      currentClub: [],
      successful: false,
      loading: false,
      message: "",
      schema,
    };
  },
  methods: {
    //error message if anything goes wrong, otherwise submit club and return success message.
    getClub(clubID) {
      ClubService.getCommunityLifeClub(clubID)
      .then(response => {
          this.currentClub = response.data;
          console.log(this.currentClub);
        })
        .catch(e => {
          console.log(e);
        });
    },
    editClub(currentClub) {
      this.message = "";
      this.successful = false;
      this.loading = true;
      ClubService.editCommunityLifeClub(this.$route.params.id, currentClub)
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
    this.getClub(this.$route.params.id);
  }
};
</script>
