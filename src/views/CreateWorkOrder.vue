<template>
<br><br><br><br><br>
  <div class="col-md-12">
    <div class="card card-container">
      <Form @submit="createActivity" :validation-schema="schema">
        <div v-if="!successful">
              <div class="form-group">
                <label for="activityName">Activity Name</label>
                <Field name="activityName" type="text" class="form-control" />
                <ErrorMessage name="activityName" class="error-feedback" />
              </div>
              <div class="form-group">
                <label for="activityDate">Activity Date</label>
                <Field name="activityDate" type="Date" class="form-control" />
                <ErrorMessage name="activityDate" class="error-feedback" />
              </div>
              <div class="form-group">
                <label for="activityDescription">Activity Description</label>
                <Field name="activityDescription" type="text" class="form-control" />
                <ErrorMessage name="activityDescription" class="error-feedback" />
              </div>
              <div class="form-group">
                <label for="activityPrice">Activity Price</label>
                <Field name="activityPrice" type="number" class="form-control" />
                <ErrorMessage name="activityPrice" class="error-feedback" />
              </div>

          <div class="form-group">
            <button class="btn btn-primary btn-block" :disabled="loading">
              <span
                v-show="loading"
                class="spinner-border spinner-border-sm"
              ></span>
              Create Activity
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
import ActivityService from "../services/commLifeActivity.service";
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
//use yup to handle input validation before user submission
export default {
  name: "createActivity",
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
      successful: false,
      loading: false,
      message: "",
      schema,
    };
  },
  methods: {        //error message if anything goes wrong, otherwise submit activity and return success message. 
    createActivity(activity) {
      this.message = "";
      this.successful = false;
      this.loading = true;
      console.log(activity);
      
      ActivityService.createCommunityLifeActivity(activity)
        .then((data) => {
          this.message = data.message;
          this.successful = true;
          this.loading = false;
          this.$router.push('/activities');
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

