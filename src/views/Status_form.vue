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
              <h5 class="card-title fw-semibold mb-4">Tambah Status</h5>
              <form @submit.prevent="TambahStatus()">
                <div class="mb-3">
                  <label for="status" class="form-label">Status </label>
                  <input
                    type="text"
                    class="form-control"
                    id="status"
                    placeholder="Ketikan Status"
                    v-model="status"
                  />
                  <!-- <div id="namaAnggota" class="form-text">
                    {{ status }}
                  </div> -->
                </div>
                <div class="mb-3">
                  <label for="biaya" class="form-label">Biaya </label>
                  <input
                    type="text"
                    class="form-control"
                    id="biaya"
                    placeholder="Ketikan Biaya"
                    v-model="biaya"
                  />
                  <!-- <div id="namaAnggota" class="form-text">
                    {{ status }}
                  </div> -->
                </div>
                <router-link
                  :to="{ name: 'Status' }"
                  class="me-2 btn btn-secondary"
                  >Kembali</router-link
                >
                <button type="submit" class="btn btn-primary">Simpan</button>
              </form>
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
import axios from "axios";
export default {
  name: "Status_form",
  components: {
    Sidebar,
    Header,
  },
  data() {
    return {
      status: "",
      biaya: "",
    };
  },
  methods: {
    async TambahStatus() {
      try {
        const respons = await axios.post(this.$api + "status", {
          status: this.status,
          biaya: this.biaya,
        });
        console.log(respons);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
