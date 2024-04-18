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

      <div
        class="container pt-3"
        style="position: relative; padding-bottom: 110px"
      >
        <form @submit.prevent="GantiPassword()">
          <div class="mb-3">
            <label class="form-label" or="password_lama"
              >Password sekarang</label
            >
            <input
              type="password"
              name="password_lama"
              id="password_lama"
              class="form-control"
              placeholder="Masukan password saat ini"
              v-model="data.password_lama"
            />
          </div>
          <div class="mb-3">
            <label class="form-label" or="password_baru">Password baru</label>
            <input
              type="password"
              name="password_baru"
              id="password_baru"
              class="form-control"
              placeholder="Masukan password baru"
              v-model="data.password_baru"
            />
          </div>
          <div class="mb-3">
            <router-link
              :to="{ name: 'Setting' }"
              class="me-2 btn btn-secondary"
              >Kembali</router-link
            >
            <button class="btn btn-primary">Simpan</button>
          </div>
        </form>
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
  name: "Keamanan",
  components: {
    Sidebar,
    Header,
  },
  data() {
    return {
      dt_anggota: [],
      dt_user: {},
      data: {
        password_lama: "",
        password_baru: "",
      },
    };
  },
  created() {
    // this.getData();
  },
  methods: {
    async getData() {
      const respon = await axios.get(this.$api + `get-anggota`);
      this.dt_anggota = respon.data;
    },
    async GantiPassword() {
      try {
        const response = await axios.post(
          this.$api + `ganti-password/${this.$route.params.id}`,
          this.data
        );
        if (response.data.status == 200) {
          Swal.fire({
            title: "Berhasil",
            text: response.data.message,
            icon: "success",
            // timer: 3000,
          }).then((result) => {
            if (result.isConfirmed) {
              localStorage.removeItem("user");
              this.$router.go();
            }
          });
        }
        if (response.data.status == 400) {
          Swal.fire({
            title: "Gagal",
            text: response.data.message,
            icon: "error",
            // timer: 3000,
          });
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
  mounted() {
    let user = JSON.parse(atob(localStorage.getItem("user")));
    this.dt_user = user.result[0];
  },
};
</script>
