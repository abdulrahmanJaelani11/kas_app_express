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
          <div class="col-12" style="margin-bottom: 60px">
            <h5 class="card-title">Riwayat transaksi</h5>
            <hr />
            <table class="table">
              <tbody>
                <tr v-for="tran in dt_riwayat" :key="tran.id">
                  <td style="width: 30px">
                    <i class="ti ti-user" style="font-size: 20px"></i>
                  </td>
                  <td>
                    <span class="fw-semibold">{{ tran.nama_anggota }}</span>
                    <small class="d-block">{{ tran.created_date }}</small>
                  </td>
                  <td class="fw-semibold">
                    <i
                      v-if="tran.tipe_transaksi == 'pemasukan'"
                      class="ti ti-arrow-up-left text-success"
                    ></i>
                    <i
                      v-if="tran.tipe_transaksi == 'pengeluaran'"
                      class="ti ti-arrow-down-left text-danger"
                    ></i
                    >{{ tran.nominal }}
                  </td>
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
import axios from "axios";
export default {
  name: "Riwayat",
  components: {
    Sidebar,
    Header,
  },
  data() {
    return {
      dt_riwayat: [],
    };
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      const respon = await axios.get(this.$api + `get-riwayat`);
      console.log(respon.data);
      this.dt_riwayat = respon.data;
    },
  },
};
</script>
