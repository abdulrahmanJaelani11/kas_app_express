<template>
  <router-view />
</template>

<script>
// @ is an alias to /src
import Sidebar from "@/components/Sidebar.vue";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "App",
  components: {
    Sidebar,
    Header,
    Footer,
  },
};
</script>

<style></style>
