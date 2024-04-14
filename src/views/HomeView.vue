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
      <div class="container pb-5">
        <!--  Row 1 -->
        <div class="row pt-3">
          <div class="col-md-12">
            <h4 style="font-weight: bold">
              Hai, {{ dt_user.result[0].full_name }}
            </h4>
            <p>Selamat datang kembali</p>
          </div>
          <div class="col-lg-4">
            <div class="row">
              <div class="col-lg-12">
                <!-- Yearly Breakup -->
                <div class="card main-card text-light shadow-lg">
                  <div class="card-body p-4">
                    <div class="row">
                      <div class="col-8">
                        <small>Saldo saat ini</small>
                        <h5
                          class="card-title text-light mb-9 fw-semibold"
                          style="font-size: 20px"
                        >
                          {{ saldo }}
                        </h5>
                      </div>
                      <div
                        class="col-4 d-flex justify-content-center align-items-center"
                      >
                        <i
                          class="ti ti-credit-card"
                          style="font-size: 50px"
                        ></i>
                      </div>
                    </div>
                    <hr style="margin: 2px 0 5px 0" />
                    <div
                      class="d-flex justify-content-start align-items-center"
                    >
                      <router-link
                        v-if="
                          dt_user.result[0].role_id == 1 ||
                          dt_user.result[0].role_id == 2
                        "
                        class="p-2 d-flex text-center flex-column text-light"
                        :to="{ name: 'Kas_form' }"
                        ><i class="ti ti-wallet" style="font-size: 25px"></i
                        ><small>Transaksi</small></router-link
                      >
                      <router-link
                        class="p-2 d-flex text-center flex-column text-light"
                        :to="{ name: 'home' }"
                        ><i class="ti ti-chart-bar" style="font-size: 25px"></i
                        ><small>Detail</small></router-link
                      >
                      <!-- <router-link
                        class="p-2 d-flex text-center flex-column text-light"
                        :to="{ name: 'Anggota' }"
                        ><i class="ti ti-users" style="font-size: 25px"></i
                        ><small>Anggota</small></router-link
                      >
                      <router-link
                        class="p-2 d-flex text-center flex-column text-light"
                        :to="{ name: 'Anggota' }"
                        ><i class="ti ti-settings" style="font-size: 25px"></i
                        ><small>Anggota</small></router-link
                      > -->
                      <!-- <router-link :to="{}"
        ><i class="ti ti-home" style="font-size: 25px"></i
      ></router-link> -->
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-12">
                <p class="fw-semibold">Transaksi Hari Ini</p>
              </div>
              <div class="col-6">
                <!-- Yearly Breakup -->
                <div class="card">
                  <div class="p-2 text-center">
                    <small class="fw-semibold">Pemasukan</small><br />
                    <i class="ti ti-arrow-up-left text-success"></i>
                    <span>{{ pemasukan }}</span>
                  </div>
                </div>
              </div>
              <div class="col-6">
                <!-- Yearly Breakup -->
                <div class="card">
                  <div class="p-2 text-center">
                    <small class="fw-semibold">Pengeluaran</small><br />
                    <i class="ti ti-arrow-down-right text-danger"></i>
                    <span>{{ pengeluaran }}</span>
                  </div>
                </div>
              </div>
              <div class="col-12">
                <p class="fw-semibold">Transaksi terakhir</p>
                <table class="table">
                  <tbody>
                    <tr v-for="tran in dt_transaksi_hari_ini" :key="tran.id">
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
        </div>

        <!-- footer -->
        <Footer />
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from "@/components/Sidebar.vue";
import Cart from "@/components/Cart.vue";
import Header from "@/components/Header.vue";
import axios from "axios";
export default {
  name: "HomeView",
  components: {
    Sidebar,
    Cart,
    Header,
  },
  data() {
    return {
      saldo: 0,
      dt_transaksi_hari_ini: 0,
      dt_user: {},
      pemasukan: 0,
      pengeluaran: 0,
    };
  },
  created() {
    this.getSaldo();
    this.getTransaksiHariIni();
    this.getUser();
    this.getPemasukan();
    this.getPengeluaran();
  },
  methods: {
    async getSaldo() {
      try {
        const response = await axios.get(this.$api + `get-saldo`);
        this.saldo = response.data.saldo.toLocaleString("id-ID", {
          style: "currency",
          currency: "IDR",
        });
      } catch (error) {
        console.log(error);
      }
    },
    async getTransaksiHariIni() {
      try {
        let results = [];
        let data;
        const response = await axios.get(this.$api + `get-transaksi-hari-ini`);
        data = response.data;
        for (let i = 0; i < data.length; i++) {
          results.push({
            id: data[i].id,
            nama_anggota: data[i].nama_anggota,
            tipe_transaksi: data[i].tipe_transaksi,
            created_date: data[i].created_date,
            nominal: data[i].nominal.toLocaleString("id-ID", {
              style: "currency",
              currency: "IDR",
            }),
          });
        }
        this.dt_transaksi_hari_ini = results;
        console.log(this.dt_transaksi_hari_ini);
      } catch (error) {
        console.log(error);
      }
    },
    async getUser() {
      this.dt_user = JSON.parse(atob(localStorage.getItem("user")));
      console.log(this.dt_user);
    },
    async getPemasukan() {
      try {
        const response = await axios.get(this.$api + `get-pemasukan`);
        if (response.data.pemasukan != null) {
          this.pemasukan = response.data.pemasukan.toLocaleString("id-ID", {
            style: "currency",
            currency: "IDR",
          });
        } else {
          this.pemasukan = 0;
        }
      } catch (error) {
        console.log(error);
        alert(error.message);
      }
    },
    async getPengeluaran() {
      try {
        const response = await axios.get(this.$api + `get-pengeluaran`);
        if (response.data.pemasukan != null) {
          this.pengeluaran = response.data.pengeluaran.toLocaleString("id-ID", {
            style: "currency",
            currency: "IDR",
          });
        } else {
          this.pengeluaran = 0;
        }
      } catch (error) {
        console.log(error);
        alert(error.message);
      }
    },
  },
};
</script>
