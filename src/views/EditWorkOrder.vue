<template>
  <div class="col-md-12">
    <div class="card card-container">
      <br><br>

      <h3 class="mx-auto"> Editing "{{currentWorkOrder.residentName}} Work Order"</h3>
      <br /><br /><br />
      <div class="col-md-12">
        <div class="card card-container">
          <Form @submit="editWorkOrder" :validation-schema="schema">
            <div v-if="!successful">
              <div class="form-group">
                <label for="residentName">Resident Name</label>
                <Field name="residentName" type="text" class="form-control" v-model="currentWorkOrder.residentName"/>
                <ErrorMessage name="residentName" class="error-feedback" />
              </div>
              <div class="form-group">
                <label for="residentUnit">Resident Unit</label>
                <Field name="residentUnit" type="text" class="form-control" v-model="currentWorkOrder.residentUnit"/>
                <ErrorMessage name="residentUnit" class="error-feedback" />
              </div>
              <div class="form-group">
                <label for="residentPhoneNum">Resident Phone #</label>
                <Field name="residentPhoneNum" type="text" class="form-control" v-model="currentWorkOrder.residentPhoneNum"/>
                <ErrorMessage name="residentPhoneNum" class="error-feedback" />
              </div>
              <div class="form-group">
                <label for="issue">Issue</label>
                <Field name="issue" type="text" class="form-control" v-model="currentWorkOrder.issue"/>
                <ErrorMessage name="issue" class="error-feedback" />
              </div>
              <div class="form-group">
                <label for="severity">Severity</label>
                <Field name="severity" type="text" class="form-control" v-model="currentWorkOrder.severity"/>
                <ErrorMessage name="severity" class="error-feedback" />
              </div>
              <div class="form-group">
                <label for="status">Status</label>
                <Field name="status" type="text" class="form-control" v-model="currentWorkOrder.status"/>
                <ErrorMessage name="status" class="error-feedback" />
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
import MaintenanceService from "../services/maintenance.service";
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
      residentName: yup
        .string()
        .required("Resident Name is required!")
        .min(3, "Must be at least 3 characters!")
        .max(20, "Must be maximum 20 characters!"),
      residentUnit: yup
        .string()
        .required("Unit # is required!")
        .min(1, "Must be at least 1 number!")
        .max(5, "Must be at most 5 numbers!"),
      residentPhoneNum: yup
        .string()
        .required("Phone # is required!")
        .min(10, "Must be 10 Numbers!")
        .max(10, "Must be 10 Numbers!"),
      issue: yup
        .string()
        .required("Issue is required!")
        .min(5, "Please write in detail about the issue!"),
      severity: yup
        .string()
        .required("Severity is required!")
        .min(3, "Must be at least 3 characters!")
        .max(20, "Must be maximum 20 characters!"),
      status: yup
        .string()
        .required("Status is required!")
        .min(3, "Must be at least 3 characters!")
        .max(20, "Must be maximum 20 characters!"),
    });

    return {
      currentWorkOrder: [],
      successful: false,
      loading: false,
      message: "",
      schema,
    };
  },
  methods: {
    //error message if anything goes wrong, otherwise submit activity and return success message.
    getWorkOrder(workOrderId) {
      MaintenanceService.getWorkOrder(workOrderId)
      .then(response => {
          this.currentWorkOrder = response.data;
          console.log(this.currentWorkOrder);
        })
        .catch(e => {
          console.log(e);
        });
    },
    editWorkOrder(currentWorkOrder) {
      this.message = "";
      this.successful = false;
      this.loading = true;
      MaintenanceService.editWorkOrder(this.$route.params.id, currentWorkOrder)
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
    this.getWorkOrder(this.$route.params.id);
  }
};
</script>

