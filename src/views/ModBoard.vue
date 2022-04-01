<template>
  <div class="container-fluid">
  <div class="px-lg-2">

    <!-- For demo purpose -->
    <div class="row py-5">
      <div class="col-lg-6 mx-auto">
        <div class="text-black p-5 shadow-sm rounded ">
          <h1 class="display-4">Select an option</h1>
        </div>
      </div>
    </div>
    <!-- End -->

    <div class="row">
      <!-- Gallery item -->
      <div class="col-xl-3 mx-auto">
        <div class="bg-white rounded shadow-sm"><a href="/events"><img src="https://icon-library.com/images/events-icon/events-icon-0.jpg" alt="" class="img-fluid card-img-top"></a>
          <div class="p-4">
            <h5> <a href="#" class="text-dark">Events</a></h5>
          </div>
        </div>
      </div>
      <!-- End -->

      <!-- Gallery item -->
      <div class="col-xl-3 mx-auto">
        <div class="bg-white rounded shadow-sm"><a href="/activities"><img src="https://www.pngitem.com/pimgs/m/59-599492_sports-activities-png-image-background-activities-icon-vector.png" alt="" class="img-fluid card-img-top"></a>
          <div class="p-4">
            <h5> <a href="#" class="text-dark">Activities</a></h5>
          </div>
        </div>
      </div>
      <!-- End -->

      <!-- Gallery item -->
      <div class="col-xl-3 mx-auto">
        <div class="bg-white rounded shadow-sm"><a href="/clubs"><img src="https://www.clipartkey.com/mpngs/m/309-3093233_extracurricular-activities-icon-png.png" alt="" class="img-fluid card-img-top"></a>
          <div class="p-4">
            <h5> <a href="#" class="text-dark">Clubs</a></h5>
          </div>
        </div>
      </div>
      <!-- End -->
    </div>

  </div>
</div>
</template>

<script>
import UserService from "../services/user.service";

export default {
  name: "userBoard",
  data() {
    return {
      
    };
  },
  mounted() {
    UserService.getPublicContent().then(
      (response) => {
        this.content = response.data;
      },
      (error) => {
        this.content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
      }
    );
  },
};
</script>

<style scoped>
  img {
    width:250px;
    height:220px;
  }
</style>