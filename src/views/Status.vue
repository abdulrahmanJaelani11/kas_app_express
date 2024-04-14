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
    <!-- <Sidebar /> -->
    <!--  Sidebar End -->
    <!--  Main wrapper -->
    <div class="body-wrapper">
      <!--  Header Start -->
      <Header />
      <!--  Header End -->
      <!--  Row 1 -->

      <div class="container pt-3">
        <div class="card">
          <div class="card-body" style="overflow: scroll">
            <router-link :to="{ name: 'Status_form' }" class="btn btn-primary"
              >Tambah</router-link
            >
            <table class="table">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Status</th>
                  <th>Biaya</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="status in dt_status" :key="status.id">
                  <td>
                    <router-link
                      :to="{
                        name: 'Status_edit',
                        params: { id: status.id },
                      }"
                      class="btn btn-primary btn-sm"
                    >
                      <i class="ti ti-edit"></i>
                    </router-link>
                  </td>
                  <td>{{ status.status }}</td>
                  <td>{{ status.biaya }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <!-- footer -->
      <Footer />
    </div>
  </div>
</template>

<script>
import Sidebar from "@/components/Sidebar.vue";
import Header from "@/components/Header.vue";
import Axios from "axios";

export default {
  name: "Anggota",
  components: {
    Sidebar,
    Header,
  },
  data() {
    return {
      dt_status: [],
    };
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      try {
        const respons = await Axios.get(this.$api + "get-status");
        console.log(respons.data);
        this.dt_status = respons.data;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
