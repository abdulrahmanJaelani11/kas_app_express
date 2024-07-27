<template>
  <div
    class="d-flex justify-content-around align-items-center fixed-bottom"
    style="height: 9%; background-color: aliceblue"
  >
    <router-link
      class="d-flex text-center flex-column icon-nav"
      :to="{ name: 'home' }"
      ><i class="ti ti-home" style="font-size: 25px"></i
      ><small>Home</small></router-link
    >
    <router-link
      class="d-flex text-center flex-column icon-nav"
      :to="{ name: 'Riwayat' }"
      ><i class="ti ti-history" style="font-size: 25px"></i
      ><small>Riwayat</small></router-link
    >
    <router-link
      class="d-flex text-center flex-column icon-nav"
      :to="{ name: 'Anggota' }"
      ><i class="ti ti-users" style="font-size: 25px"></i
      ><small>Anggota</small></router-link
    >
    <router-link
      class="d-flex text-center flex-column icon-nav"
      :to="{ name: 'Setting' }"
      ><i class="ti ti-settings" style="font-size: 25px"></i
      ><small>Setting</small></router-link
    >
    <!-- <router-link :to="{}"
      ><i class="ti ti-home" style="font-size: 25px"></i
    ></router-link> -->
  </div>
</template>

<script>
import $ from "jquery";

export default {
  name: "Header",
  // mounted() {
  //   $()
  // },
};
</script>
