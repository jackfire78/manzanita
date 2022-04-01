<template>
  <div class="col-md-12">
    <div class="card card-container">
      <br><br>

      <h3 class="mx-auto"> Editing "{{currentActivity.activityName}}"</h3>
      <br /><br /><br />
      <div class="col-md-12">
        <div class="card card-container">
          <Form @submit="editActivity" :validation-schema="schema">
            <div v-if="!successful">
              <div class="form-group">
                <label for="activityName">Activity Name</label>
                <Field name="activityName" type="text" class="form-control" v-model="currentActivity.activityName"/>
                <ErrorMessage name="activityName" class="error-feedback" />
              </div>
              <div class="form-group">
                <label for="activityDate">Activity Date</label>
                <Field name="activityDate" type="Date" class="form-control" v-model="currentActivity.activityDate"/>
                <ErrorMessage name="activityDate" class="error-feedback" />
              </div>
              <div class="form-group">
                <label for="activityDescription">Activity Description</label>
                <Field name="activityDescription" type="text" class="form-control" v-model="currentActivity.activityDescription"/>
                <ErrorMessage name="activityDescription" class="error-feedback" />
              </div>
              <div class="form-group">
                <label for="activityPrice">Activity Price</label>
                <Field name="activityPrice" type="number" class="form-control" v-model="currentActivity.activityPrice"/>
                <ErrorMessage name="activityPrice" class="error-feedback" />
              </div>

              <div class="form-group">
                <button class="btn btn-primary btn-block" :disabled="loading">
                  <span v-show="loading"
                    class="spinner-border spinner-border-sm">
                  </span>
                  Edit Selected Activity
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
import ActivityService from "../services/commLifeActivity.service";
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
//use yup to handle input validation before user submission
export default {
  name: "editActivity",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const schema = yup.object().shape({
      activityName: yup
        .string()
        .required("Activity Name is required!")
        .min(3, "Must be at least 3 characters!")
        .max(20, "Must be maximum 20 characters!"),
      activityDate: yup
        .date()
        .required("Date is required!"),
      activityDescription: yup
        .string()
        .required("Description is required!")
        .min(6, "Must be at least 6 characters!")
        .max(500, "Must be maximum 500 characters!"),
      activityPrice: yup
        .number()
        .required("Price is required!"),
    });

    return {
      currentActivity: [],
      successful: false,
      loading: false,
      message: "",
      schema,
    };
  },
  methods: {
    //error message if anything goes wrong, otherwise submit activity and return success message.
    getActivity(activityID) {
      ActivityService.getCommunityLifeActivity(activityID)
      .then(response => {
          this.currentActivity = response.data;
          console.log(this.currentActivity);
        })
        .catch(e => {
          console.log(e);
        });
    },
    editActivity(currentActivity) {
      this.message = "";
      this.successful = false;
      this.loading = true;
      ActivityService.editCommunityLifeActivity(this.$route.params.id, currentActivity)
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
    this.getActivity(this.$route.params.id);
  }
};
</script>

