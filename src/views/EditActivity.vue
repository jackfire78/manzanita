<template>
  <div class="col-md-12">
    <div class="card card-container">
      <br><br>
      <img
        id="profile-img"
        :src="currentEvent.eventPicture"
        class="rounded mx-auto d-block"
      />
      <h3 class="mx-auto"> Editing "{{currentEvent.eventName}}"</h3>
      <br /><br /><br />
      <div class="col-md-12">
        <div class="card card-container">
          <Form @submit="editEvent" :validation-schema="schema">
            <div v-if="!successful">
              <div class="form-group">
                <label for="eventName">Event Name</label>
                <Field name="eventName" type="text" class="form-control" v-model="currentEvent.eventName"/>
                <ErrorMessage name="eventName" class="error-feedback" />
              </div>
              <div class="form-group">
                <label for="eventDescription">Event Description</label>
                <Field name="eventDescription" type="text" class="form-control" v-model="currentEvent.eventDescription"/>
                <ErrorMessage name="eventDescription" class="error-feedback" />
              </div>
              <div class="form-group">
                <label for="eventPrice">Event Price</label>
                <Field name="eventPrice" type="number" class="form-control" v-model="currentEvent.eventPrice"/>
                <ErrorMessage name="eventPrice" class="error-feedback" />
              </div>
              <div class="form-group">
                <label for="eventDate">Event Date</label>
                <Field name="eventDate" type="Date" class="form-control" v-model="currentEvent.eventDate"/>
                <ErrorMessage name="eventDate" class="error-feedback" />
              </div>
              <div class="form-group">
                <label for="eventPicture">Event Picture</label>
                <Field name="eventPicture" type="text" class="form-control" v-model="currentEvent.eventPicture"/>
                <ErrorMessage name="eventPicture" class="error-feedback" />
              </div>
              <div class="form-group">
                <label for="eventPresenters">Event Presenters</label>
                <Field name="eventPresenters" type="text" class="form-control" v-model="currentEvent.eventPresenters"/>
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
import EventService from "../services/event.service";
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
//use yup to handle input validation before user submission
export default {
  name: "editEvent",
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
      currentEvent: [],
      successful: false,
      loading: false,
      message: "",
      schema,
    };
  },
  methods: {
    //error message if anything goes wrong, otherwise submit event and return success message.
    getEvent(eventID) {
      EventService.getCommunityEvent(eventID)
      .then(response => {
          this.currentEvent = response.data;
          console.log(this.currentEvent);
        })
        .catch(e => {
          console.log(e);
        });
    },
    editEvent(currentEvent) {
      this.message = "";
      this.successful = false;
      this.loading = true;
      EventService.editCommunityEvent(this.$route.params.id, currentEvent)
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
    this.getEvent(this.$route.params.id);
  }
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