<template>
  <div class="col-md-12">
    <div class="card card-container">
      <img
        id="profile-img"
        src="{{ event.eventPicture }}"
        class="profile-img-card"
      />
      <br /><br /><br /><br /><br />
      <div class="col-md-12">
        <div class="card card-container">
          <Form @submit="createEvent" :validation-schema="schema">
            <div v-if="!successful">
              <div class="form-group">
                <label for="eventName">Event Name</label>
                <Field name="eventName" type="text" class="form-control">{{event.eventName}}</Field>
                <ErrorMessage name="eventName" class="error-feedback" />
              </div>
              <div class="form-group">
                <label for="eventDescription">Event Description</label>
                <Field name="eventDescription" type="text" class="form-control">{{event.eventDescription}}</Field>
                <ErrorMessage name="eventDescription" class="error-feedback" />
              </div>
              <div class="form-group">
                <label for="eventPrice">Event Price</label>
                <Field name="eventPrice" type="number" class="form-control">{{event.eventPrice}}</Field>
                <ErrorMessage name="eventPrice" class="error-feedback" />
              </div>
              <div class="form-group">
                <label for="eventDate">Event Date</label>
                <Field name="eventDate" type="date" class="form-control">{{event.eventDate}}</Field>
                <ErrorMessage name="eventDate" class="error-feedback" />
              </div>
              <div class="form-group">
                <label for="eventPicture">Event Picture</label>
                <Field name="eventPicture" type="text" class="form-control">{{event.eventPicture}}</Field>
                <ErrorMessage name="eventPicture" class="error-feedback" />
              </div>
              <div class="form-group">
                <label for="eventPresenters">Event Presenters</label>
                <Field name="eventPresenters" type="text" class="form-control">{{event.eventPresenters}}</Field>
                <ErrorMessage name="eventPresenters" class="error-feedback" />
              </div>

              <div class="form-group">
                <button class="btn btn-primary btn-block" :disabled="loading">
                  <span v-show="loading"
                    class="spinner-border spinner-border-sm">
                  </span>
                  Edit Selected Event
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
      eventName: yup
        .string()
        .required("Event Name is required!")
        .min(3, "Must be at least 3 characters!")
        .max(20, "Must be maximum 20 characters!"),
      eventDescription: yup
        .string()
        .required("Description is required!")
        .min(6, "Must be at least 6 characters!")
        .max(500, "Must be maximum 500 characters!"),
      eventPrice: yup
        .number()
        .required("Price is required!"),
      eventDate: yup
        .date()
        .required("Date is required!"),
      eventPicture: yup
        .string()
        .required("Picture is required!")
        .min(5, "Must be at least 5 characters!"),
      eventPresenters: yup
        .string()
        .required("Event Presenters is required!")
        .min(3, "Must be at least 3 characters!")
        .max(100, "Must be maximum 100 characters!"),
    });

    return {
      successful: false,
      loading: false,
      message: "",
      schema,
    };
  },
  computed: {
    //
  },

  methods: {
    //error message if anything goes wrong, otherwise submit user and return success message.
    editEvent(event) {
      this.message = "";
      this.successful = false;
      this.loading = true;

      this.$store.dispatch("auth/editEvent", event).then(
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
  text-align: center;
}
img {
  width: 200px;
  height: 200px;
}
</style>