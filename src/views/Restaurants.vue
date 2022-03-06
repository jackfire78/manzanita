<template>
  <div class="container-fluid">
  <div class="px-lg-2">

    <!-- For demo purpose -->
    <div class="row py-5">
      <div class="col-lg-12 mx-auto">
        <div class="text-black p-5 shadow-sm rounded ">
          <h1 class="display-4">Restaurants</h1>
        </div>
      </div>
    </div>
    <!-- End -->

    <div class="row">
      <!-- Gallery item -->
      <div class="col-xl-3 col-lg-4 col-md-6 mb-4">
        <div class="bg-white rounded shadow-sm"><img src="https://bootstrapious.com/i/snippets/sn-gallery/img-1.jpg" alt="" class="img-fluid card-img-top">
          <div class="p-4">
            <h5> <a href="#" class="text-dark">Mesquite Grill</a></h5>
            <p class="small text-muted mb-0"> Dates Open: Lorem ipsum dolor sit amet, consectetur adipisicing elit</p>
            <div class="d-flex align-items-center justify-content-between rounded-pill bg-light px-3 py-2 mt-4">
              <p class="small mb-0"><i class="fa fa-picture-o mr-2"></i><span class="font-weight-bold">JPG</span></p>
              <div class="badge badge-danger px-3 rounded-pill font-weight-normal">New</div>
            </div>
          </div>
        </div>
      </div>
      <!-- End -->

      <!-- Gallery item -->
      <div class="col-xl-3 col-lg-4 col-md-6 mb-4">
        <div class="bg-white rounded shadow-sm"><img src="https://bootstrapious.com/i/snippets/sn-gallery/img-2.jpg" alt="" class="img-fluid card-img-top">
          <div class="p-4">
            <h5> <a href="#" class="text-dark">Canyon Café</a></h5>
            <p class="small text-muted mb-0"> Dates Open: Lorem ipsum dolor sit amet, consectetur adipisicing elit</p>
            <div class="d-flex align-items-center justify-content-between rounded-pill bg-light px-3 py-2 mt-4">
              <p class="small mb-0"><i class="fa fa-picture-o mr-2"></i><span class="font-weight-bold">PNG</span></p>
              <div class="badge badge-primary px-3 rounded-pill font-weight-normal">Trend</div>
            </div>
          </div>
        </div>
      </div>
      <!-- End -->

      <!-- Gallery item -->
      <div class="col-xl-3 col-lg-4 col-md-6 mb-4">
        <div class="bg-white rounded shadow-sm"><img src="https://bootstrapious.com/i/snippets/sn-gallery/img-3.jpg" alt="" class="img-fluid card-img-top">
          <div class="p-4">
            <h5> <a href="#" class="text-dark">Owls Nest</a></h5>
            <p class="small text-muted mb-0"> Dates Open: Lorem ipsum dolor sit amet, consectetur adipisicing elit</p>
            <div class="d-flex align-items-center justify-content-between rounded-pill bg-light px-3 py-2 mt-4">
              <p class="small mb-0"><i class="fa fa-picture-o mr-2"></i><span class="font-weight-bold">JPG</span></p>
              <div class="badge badge-warning px-3 rounded-pill font-weight-normal text-white">Featured</div>
            </div>
          </div>
        </div>
      </div>
      <!-- End -->

      <!-- Gallery item -->
      <div class="col-xl-3 col-lg-4 col-md-6 mb-4">
        <div class="bg-white rounded shadow-sm"><img src="https://bootstrapious.com/i/snippets/sn-gallery/img-4.jpg" alt="" class="img-fluid card-img-top">
          <div class="p-4">
            <h5> <a href="#" class="text-dark">Palo Verde</a></h5>
            <p class="small text-muted mb-0"> Dates Open: Lorem ipsum dolor sit amet, consectetur adipisicing elit</p>
            <div class="d-flex align-items-center justify-content-between rounded-pill bg-light px-3 py-2 mt-4">
              <p class="small mb-0"><i class="fa fa-picture-o mr-2"></i><span class="font-weight-bold">JPEG</span></p>
              <div class="badge badge-success px-3 rounded-pill font-weight-normal"></div>
            </div>
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
  name: "Home",
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