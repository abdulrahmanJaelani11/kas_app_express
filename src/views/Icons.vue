<template>
  <div
    class="page-wrapper"
    id="main-wrapper"
    data-layout="vertical"
    data-navbarbg="skin6"
    data-sidebartype="full"
    data-sidebar-position="fixed"
    data-header-position="fixed"
  >
    <!-- Sidebar Start -->
    <Sidebar />
    <!--  Sidebar End -->
    <!--  Main wrapper -->
    <div class="body-wrapper">
      <!--  Header Start -->
      <Header />
      <!--  Header End -->
      <div class="container-fluid">
        <!--  Row 1 -->

        <div class="container-fluid">
          <div class="card w-100 h-100 position-relative overflow-hidden">
            <div class="card-body">
              <h5 class="card-title fw-semibold mb-4">Icons</h5>
              <iframe
                src="https://tabler-icons.io/"
                frameborder="0"
                style="height: calc(100vh - 250px); width: 100%"
                data-simplebar=""
              ></iframe>
            </div>
          </div>
        </div>
        <!-- footer -->
        <Footer />
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from "@/components/Sidebar.vue";
export default {
  name: "Icons",
  components: {
    Sidebar,
  },
};
</script>
