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

      <div class="container pt-3">
        <!-- <h5 style="font-weight: bold">Daftar Anggota</h5> -->
        <div class="row">
          <div class="card">
            <div class="card-body">
              <div class="row">
                <form @submit.prevent="Update()">
                  <div class="form-group mb-3">
                    <label for="full_name" class="mb-2">Nama Lengkap</label>
                    <input
                      type="text"
                      name="full_name"
                      id="full_name"
                      class="form-control"
                      placeholder="Masukan Nama Lengkap"
                      v-model="full_name"
                    />
                  </div>
                  <div class="form-group">
                    <button type="submit" class="btn btn-primary">
                      <i class="ti ti-save"></i> Simpan
                    </button>
                  </div>
                </form>
              </div>
            </div>
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
import axios from "axios";
export default {
  name: "Profile",
  components: {
    Sidebar,
    Header,
  },
  data() {
    return {
      dt_user: {},
      full_name: "",
    };
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      this.dt_user = JSON.parse(atob(localStorage.getItem("user")));
      this.full_name = this.dt_user.result[0].full_name;
    },
    async Update() {
      try {
        const response = await axios.put(
          this.$api + `profile/${this.dt_user.result[0].id}`,
          {
            full_name: this.full_name,
          }
        );
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
