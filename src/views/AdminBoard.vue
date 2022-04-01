<template>
  <div class="container-fluid">
  <div class="px-lg-2">

    <!-- For demo purpose -->
    <div class="row py-5">
      <div class="col-lg-8 mx-auto">
        <div class="text-black p-5 shadow-sm rounded ">
          <h1 class="display-4">Select an ADMIN option</h1>
        </div>
      </div>
    </div>
    <!-- End -->

    <div class="row">
      <!-- Gallery item -->
      <div class="col-xl-3 mx-auto">
        <div class="bg-white rounded shadow-sm"><a href="/allUsers"><img src="https://cdn-icons-png.flaticon.com/512/33/33308.png" alt="" class="img-fluid card-img-top"></a>
          <div class="p-4">
            <h5> <a href="#" class="text-dark">All Users</a></h5>
          </div>
        </div>
      </div>
      <!-- End -->

      <!-- Gallery item -->
      <div class="col-xl-3 mx-auto">
        <div class="bg-white rounded shadow-sm"><a href="/allWorkers"><img src="https://www.pngitem.com/pimgs/m/11-113308_staff-icon-png-transparent-png.png" alt="" class="img-fluid card-img-top"></a>
          <div class="p-4">
            <h5> <a href="#" class="text-dark">All Workers</a></h5>
          </div>
        </div>
      </div>
      <!-- End -->

      <!-- Gallery item -->
      <div class="col-xl-3 mx-auto">
        <div class="bg-white rounded shadow-sm"><a href=""><img src="https://cdn-icons-png.flaticon.com/512/5359/5359945.png" alt="" class="img-fluid card-img-top"></a>
          <div class="p-4">
            <h5> <a href="#" class="text-dark">Extra Options</a></h5>
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
  name: "adminBoard",
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