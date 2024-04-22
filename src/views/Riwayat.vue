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
            <div class="row">
              <div class="col-6">
                <h5 class="card-title">Riwayat transaksi</h5>
              </div>
              <div class="col-6 d-flex justify-content-end">
                <button @click="downloadPDF()" class="btn btn-primary btn-sm">
                  Unduh PDF
                </button>
              </div>
            </div>
            <hr />
            <table class="table">
              <tbody>
                <tr v-for="tran in dt_riwayat" :key="tran.id">
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
                    <span class="fs-2 fw-semibold">{{
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
                    ><span class="fw-semibold fs-2"> {{ tran.nominal }}</span>
                    <small class="d-block p-0"
                      >{{ tran.bulan }} {{ tran.tahun }}</small
                    >
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
      let results = [];
      const respon = await axios.get(this.$api + `get-riwayat`);
      let data = respon.data;
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
      this.dt_riwayat = results;
    },
    async downloadPDF() {
      // Mengirim permintaan ke server untuk mendapatkan file PDF
      try {
        const response = await axios.get(this.$api + "generate-pdf", {
          responseType: "blob", // Menentukan tipe respons sebagai blob
        });
        console.log(response.data);
        if (response) {
          const blob = new Blob([response.data]);
          const url = window.URL.createObjectURL(blob);

          // Membuat tautan untuk file PDF dan mengkliknya secara otomatis
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "Data_transaksi.pdf");
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
