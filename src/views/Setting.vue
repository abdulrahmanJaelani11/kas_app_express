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
          <div class="col-12">
            <div class="card">
              <div class="card-body">
                <table class="table">
                  <tbody>
                    <tr>
                      <td colspan="2">
                        <div class="row">
                          <div class="col-3">
                            <img
                              src="../../public/assets/images/profile/user-1.jpg"
                              alt="logo"
                              class="img-fluid rounded-circle"
                            />
                          </div>
                          <div class="col-9 d-flex align-items-center">
                            <router-link :to="{ name: 'Profile' }"
                              ><span class="text-dark fs-4 fw-semibold">{{
                                dt_user.result[0].full_name
                              }}</span
                              ><br />
                              <span class="text-dark">{{
                                dt_user.result[0].status
                              }}</span></router-link
                            >
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td style="width: 30px">
                        <i class="ti ti-user fs-6"></i>
                      </td>
                      <td>
                        <router-link
                          :to="{ name: `Status` }"
                          class="fw-semibold text-dark"
                          >Referensi Status</router-link
                        >
                      </td>
                    </tr>
                    <tr>
                      <td style="width: 30px">
                        <i class="ti ti-lock fs-6"></i>
                      </td>
                      <td>
                        <router-link
                          :to="{
                            name: 'Keamanan',
                            params: { id: dt_user.result[0].id },
                          }"
                          class="fw-semibold text-dark"
                          >Akun & Keamanan</router-link
                        >
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div class="card">
              <div class="card-body">
                <button
                  type="button"
                  @click="logout()"
                  class="btn btn-outline-primary fw-semibold"
                  style="width: 100%"
                >
                  Logout
                </button>
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
import Swal from "sweetalert2";

export default {
  name: "Setting",
  components: {
    Sidebar,
    Header,
  },
  data() {
    return {
      dt_user: [],
    };
  },
  created() {
    this.getData();
  },
  methods: {
    logout() {
      Swal.fire({
        title: "Logout?",
        text: "Apakah anda yakin untuk logout?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya",
        cancelButtonText: "Batal",
      }).then((result) => {
        if (result.isConfirmed) {
          // Swal.fire({
          //   title: "Deleted!",
          //   text: "Your file has been deleted.",
          //   icon: "success",
          // });
          localStorage.removeItem("user");
          this.$router.go();
        }
      });
      // if (confirm("Yakin untuk logout?")) {
      // }
    },
    async getData() {
      this.dt_user = JSON.parse(atob(localStorage.getItem("user")));
    },
  },
};
</script>
