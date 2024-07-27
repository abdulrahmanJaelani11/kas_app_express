<template>
  <div>
    <!-- Sidebar Start -->
    <!-- <Sidebar /> -->
    <!--  Sidebar End -->
    <!--  Main wrapper -->
    <div class="body-wrapper">
      <!--  Header Start -->
      <Header />
      <!--  Header End -->
      <div class="container pb-5">
        <div v-if="loading" class="loading-overlay">
          <span>Loading...</span>
        </div>
        <router-link
          v-if="dt_user.result[0].role_id != 3"
          :to="{ name: 'ListTransaksi' }"
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
          ><i class="ti ti-wallet fs-6"></i
        ></router-link>
        <!--  Row 1 -->
        <div class="row pt-3">
          <div class="col-lg-12 col-sm-4">
            <div class="row content">
              <div class="col-lg-4 col-sm-12">
                <div class="col-12">
                  <h4 style="font-weight: bold">
                    Hai, {{ dt_user.result[0].full_name }}
                  </h4>
                  <p>Selamat datang kembali</p>
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
                          :to="{ name: 'ListTransaksi' }"
                          ><i class="ti ti-wallet" style="font-size: 25px"></i
                          ><small>Transaksi</small></router-link
                        >
                        <router-link
                          @click="navigate()"
                          class="p-2 d-flex text-center flex-column text-light"
                          :to="{ name: 'DetailTransaksi' }"
                          ><i
                            class="ti ti-chart-bar"
                            style="font-size: 25px"
                          ></i
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
                  <p class="fw-semibold m-0">Transaksi Hari Ini</p>
                  <div class="row">
                    <div class="col-6 my-2">
                      <!-- Yearly Breakup -->
                      <div class="p-2 text-center shadow rounded">
                        <span class="fw-semibold fs-2">Pemasukan</span><br />
                        <i class="ti ti-arrow-up-left text-success"></i>
                        <span>{{ pemasukan }}</span>
                      </div>
                    </div>
                    <div class="col-6 my-2">
                      <!-- Yearly Breakup -->
                      <div class="p-2 shadow rounded text-center">
                        <span class="fw-semibold fs-2">Pengeluaran</span><br />
                        <i class="ti ti-arrow-down-right text-danger"></i>
                        <span>{{ pengeluaran }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-sm-12 col-lg-8">
                <div id="riwayat">
                  <p class="fw-semibold m-0">Transaksi terakhir</p>
                  <table class="table">
                    <tbody>
                      <tr v-for="tran in dt_transaksi_hari_ini" :key="tran.id">
                        <td
                          style="padding-right: 0; padding-left: 0"
                          class="d-flex align-items-center"
                        >
                          <img
                            src="../../public/assets/images/profile/user-1.jpg"
                            alt="logo"
                            style="
                              width: 40px;
                              margin: 0;
                              padding: 0;
                              border-radius: 50%;
                            "
                          />
                        </td>
                        <td>
                          <span class="fw-semibold fs-2">{{
                            tran.nama_anggota
                          }}</span>
                          <small class="d-block">{{ tran.created_date }}</small>
                        </td>
                        <td class="text-end">
                          <i
                            v-if="tran.tipe_transaksi == 'pemasukan'"
                            class="ti ti-arrow-up-left text-success"
                          ></i>
                          <i
                            v-if="tran.tipe_transaksi == 'pengeluaran'"
                            class="ti ti-arrow-down-right text-danger"
                          ></i
                          ><span class="fw-semibold fs-2">
                            {{ tran.nominal }}</span
                          >
                          <small class="d-block p-0">
                            {{ tran.bulan }} {{ tran.tahun }}</small
                          >
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
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
      loading: false,
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
        this.saldo = response.data.toLocaleString("id-ID", {
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
            bulan: data[i].bulan,
            tahun: data[i].tahun,
            nominal: parseInt(data[i].nominal).toLocaleString("id-ID", {
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
        if (response.data.pengeluaran != null) {
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
    navigate() {
      this.loading = true; // Set state loading menjadi true
    },
  },
  // beforeRouteLeave(to, from, next) {
  //   // Tunggu beberapa waktu (contoh: 2 detik) untuk menampilkan efek loading
  //   setTimeout(() => {
  //     // Set state loading kembali ke false setelah waktu tertentu
  //     this.loading = false;
  //     next(); // Lanjutkan navigasi
  //   }, 500); // Ubah angka 2000 sesuai dengan kebutuhan waktu loading
  // },
};
</script>
