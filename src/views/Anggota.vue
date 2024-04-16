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
        <!-- <h5 style="font-weight: bold">Daftar Anggota</h5> -->
        <router-link
          v-if="dt_user.role_id != 3"
          :to="{ name: 'Anggota_form' }"
          class="btn btn-primary"
          style="
            z-index: 9999;
            position: fixed;
            bottom: 5%;
            right: 50%;
            transform: translateX(50%);
            width: 60px;
            height: 60px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 5px solid white;
          "
          ><i class="ti ti-plus"></i
        ></router-link>
        <div class="row">
          <div class="col-12" v-for="anggota in dt_anggota" :key="anggota.id">
            <div class="card">
              <div class="card-body">
                <div class="row">
                  <div class="col-3">
                    <img
                      src="../../public/assets/images/profile/user-1.jpg"
                      alt="logo"
                      class="img-fluid rounded-circle"
                    />
                  </div>
                  <div class="col-7">
                    <span class="fw-semibold fs-2">{{ anggota.nama }}</span
                    ><br />
                    <span class="fs-2">{{ anggota.status }}</span>
                  </div>
                  <div class="col-2">
                    <div class="dropdown">
                      <a
                        class="btn btn-primary fs-2 btn-sm dropdown-toggle"
                        href="#"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        Aksi
                      </a>

                      <ul class="dropdown-menu">
                        <li v-if="dt_user.role_id != 3">
                          <router-link
                            :to="{
                              name: 'Anggota_edit',
                              params: { id: anggota.id },
                            }"
                            class="dropdown-item fs-2"
                            ><i class="ti ti-edit"></i>Edit</router-link
                          >
                        </li>
                        <li v-if="dt_user.role_id != 3">
                          <router-link
                            :to="{ name: 'Anggota_form' }"
                            class="dropdown-item fs-2"
                            ><i class="ti ti-trash"></i>Hapus</router-link
                          >
                        </li>
                        <li>
                          <router-link
                            :to="{
                              name: 'DetailPembayaran',
                              params: { id: anggota.id },
                            }"
                            class="dropdown-item fs-2"
                            ><i class="ti ti-wallet"></i>Lihat
                            Pembayaran</router-link
                          >
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
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
  name: "Anggota",
  components: {
    Sidebar,
    Header,
  },
  data() {
    return {
      dt_anggota: [],
      dt_user: {},
    };
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      const respon = await axios.get(this.$api + `get-anggota`);
      this.dt_anggota = respon.data;
    },
    async TambahAnggota() {},
  },
  mounted() {
    let user = JSON.parse(atob(localStorage.getItem("user")));
    this.dt_user = user.result[0];
  },
};
</script>
