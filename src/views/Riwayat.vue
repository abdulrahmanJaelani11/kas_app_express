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

      <div class="container">
        <!-- <h5 style="font-weight: bold">Daftar Anggota</h5> -->
        <div class="row">
          <div class="col-12">
            <div
              class="row"
              style="
                position: sticky;
                top: 0;
                background-color: white;
                padding: 10px 0;
              "
            >
              <div class="col-6">
                <h5 class="card-title">Riwayat transaksi</h5>
              </div>
              <div class="col-6 d-flex justify-content-end">
                <!-- <button class="btn btn-sm btn-primary me-2 btn_filter">
                  Filter
                </button> -->
                <button
                  class="btn btn-sm m-t-4 btn-info me-2"
                  type="button"
                  data-bs-toggle="modal"
                  data-bs-target="#modal-filter"
                >
                  Filter
                </button>
                <button @click="downloadPDF()" class="btn btn-primary btn-sm">
                  Unduh PDF
                </button>
              </div>
            </div>
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
                <tr v-if="dt_riwayat.length == 0">
                  <td colspan="3" class="fw-semibold text-center">
                    Tidak ada transaksi
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <!-- footer -->
      <div
        id="modal-filter"
        class="modal fade"
        tabindex="-1"
        role="dialog"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title judul_list_file">Filter Transaksi</h5>
              <button
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div class="form-group row">
                <div class="col-6">
                  <label for="tgl_awal" class="form-label">Tanggal awal</label>
                  <input
                    type="date"
                    name="tgl_awal"
                    id="tgl_awal"
                    class="form-control"
                    v-model="filter.tgl_awal"
                  />
                </div>
                <div class="col-6">
                  <label for="tgl_akhir" class="form-label"
                    >Tanggal akhir</label
                  >
                  <input
                    type="date"
                    name="tgl_akhir"
                    id="tgl_akhir"
                    class="form-control"
                    v-model="filter.tgl_akhir"
                  />
                </div>
              </div>
              <div class="form-group mt-2">
                <label for="filter_anggota" class="form-label"
                  >Nama Anggota</label
                >
                <select
                  name="filter_anggota"
                  id="filter_anggota"
                  class="form-control"
                  v-model="filter.anggota"
                >
                  <option value="0">Pilih Anggota</option>
                  <option
                    v-for="anggota in dt_anggota"
                    :key="anggota.id"
                    :value="anggota.id"
                  >
                    {{ anggota.nama }}
                  </option>
                </select>
              </div>
            </div>
            <div class="modal-footer">
              <button
                class="btn btn-secondary"
                type="button"
                data-bs-dismiss="modal"
              >
                Tutup
              </button>
              <button
                class="btn btn-primary"
                type="button"
                data-bs-dismiss="modal"
                @click="getDataFilter()"
              >
                Filter
              </button>
            </div>
          </div>
        </div>
      </div>
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
  name: "Riwayat",
  components: {
    Sidebar,
    Header,
  },
  data() {
    return {
      dt_riwayat: [],
      dt_anggota: [],
      filter: {
        tgl_awal: null,
        tgl_akhir: null,
        anggota: 0,
      },
    };
  },
  created() {
    this.getData();
    this.getAnggota();
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
    async getAnggota() {
      const respon = await axios.get(this.$api + `get-anggota`);
      this.dt_anggota = respon.data;
    },
    async getDataFilter() {
      const response = await axios.post(
        this.$api + `get-riwayat-filter`,
        this.filter
      );
      this.dt_riwayat = response.data;
    },
  },
};
</script>
