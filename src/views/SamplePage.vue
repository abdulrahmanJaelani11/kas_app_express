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
          <div class="card">
            <div class="card-body">
              <h5 class="card-title fw-semibold mb-4">Sample Page</h5>
              <p class="mb-0">This is a sample page</p>
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
import Header from "@/components/Header.vue";
export default {
  name: "Icons",
  components: {
    Sidebar,
    Header,
  },
};
</script>
