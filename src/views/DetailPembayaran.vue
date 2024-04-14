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
        <div class="row">
          <div class="col-12">
            <div
              style="
                /* background-color: aqua; */
                overflow: scroll;
                width: 100%;
                display: flex;
                justify-content: space-between;
                flex-direction: row;
              "
            >
              <div style="width: 20%" v-for="tahun in dt_tahun" :key="tahun.id">
                <div
                  class="card text-center border-dark"
                  @click="getData(tahun.id)"
                >
                  <span class="p-2">{{ tahun.tahun }}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="col-12" v-for="trans in dt_detPembayaran" :key="trans.id">
            <div class="card border-success" v-if="trans.nominal != null">
              <div class="card-body">
                <div class="row">
                  <div class="col-8">
                    <div class="card-title fw-semibold">
                      {{ trans.bulan }} {{ trans.tahun }}
                    </div>
                    <span>{{ trans.nominal }}</span>
                  </div>
                  <div
                    class="col-4 d-flex justify-content-center align-items-center"
                  >
                    <i class="ti ti-wallet" style="font-size: 30px"></i>
                  </div>
                </div>
                <hr class="mt-2 p-0" />
                <div class="d-flex justify-content-between">
                  <span class="fw-semibold">Telah terbayar</span>
                  <span>{{ trans.created_date }}</span>
                </div>
              </div>
            </div>
            <div class="card border-danger" v-if="trans.nominal == null">
              <div class="card-body">
                <div class="card-title fw-semibold">{{ trans.bulan }}</div>
                <p>{{ trans.nominal }}</p>
                <div class="text-center">
                  <span>Belum terbayar</span>
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
import $ from "jquery";

export default {
  name: "DetailPembayaran",
  components: {
    Sidebar,
    Header,
  },
  data() {
    return {
      dt_detPembayaran: [],
      dt_tahun: [],
    };
  },
  created() {
    this.getData(1);
    this.getTahun();
  },
  methods: {
    async getData(tahun = null) {
      const respon = await axios.get(
        this.$api + `get-pembayaran-det/${this.$route.params.id}/${tahun}`
      );
      this.dt_detPembayaran = respon.data;
      console.log(respon);
    },
    async getTahun() {
      const respon = await axios.get(this.$api + `get-tahun`);
      this.dt_tahun = respon.data;
      console.log(this.dt_tahun);
    },
  },
};
</script>
