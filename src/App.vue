<template>
  <div id="app" class="container">
    <h2 class="text-center">DAFTAR BUKU</h2>
    <div>
          <data-perpus />
    </div>
  </div>
</template>
   
<script>
import DataPerpus from "./components/DataPerpus.vue";

export default {
  name: "App",
  components: {
    DataPerpus,
  },
};
</script>