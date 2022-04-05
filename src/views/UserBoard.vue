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
    <div class="row">
      <!-- Gallery item -->
      <div class="col-xl-3 mx-auto">
        <div class="bg-white rounded shadow-sm"><a href="/movies"><img src="https://www.pngitem.com/pimgs/m/466-4663233_cinema-icon-cinema-logo-png-transparent-png.png" alt="" class="img-fluid card-img-top"></a>
          <div class="p-4">
            <h5> <a href="#" class="text-dark">Movies</a></h5>
          </div>
        </div>
      </div>
      <!-- End -->

      <!-- Gallery item -->
      <div class="col-xl-3 mx-auto">
        <div class="bg-white rounded shadow-sm"><a href="/restaurants"><img src="https://www.pngitem.com/pimgs/m/640-6409978_restaurants-homepage-icon-circle-hd-png-download.png" alt="" class="img-fluid card-img-top"></a>
          <div class="p-4">
            <h5> <a href="#" class="text-dark">Restaurants</a></h5>
          </div>
        </div>
      </div>
      <!-- End -->

      <!-- Gallery item -->
      <div class="col-xl-3 mx-auto">
        <div class="bg-white rounded shadow-sm"><a href="/workOrders"><img src="data:image/png;base64,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" alt="" class="img-fluid card-img-top"></a>
          <div class="p-4">
            <h5> <a href="#" class="text-dark">Work Orders</a></h5>
          </div>
        </div>
      </div>
      <!-- End -->
    </div>
  </div>
</div>
</template>

<script>

export default {
  name: "userBoard",
  data() {
    return {
      
    };
  },

};
</script>

<style scoped>
  img {
    width:250px;
    height:220px;
  }
</style>