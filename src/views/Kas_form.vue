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

      <div class="container py-4">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title fw-semibold mb-4">
              Form pembayaran uang Kas
            </h5>
            <form @submit.prevent="TambahPembayaran()">
              <div class="mb-3">
                <label for="anggota" class="form-label">Nama anggota</label>
                <select
                  name="anggota"
                  id="anggota"
                  class="form-control"
                  v-model="ref_anggota.anggota"
                >
                  <option value="">Pilih anggota</option>
                  <option
                    v-for="anggota in dt_anggota"
                    :key="anggota.id"
                    :value="anggota.id + '_' + anggota.biaya"
                  >
                    {{ anggota.nama }}
                  </option>
                </select>
              </div>
              <div class="mb-3">
                <label for="ref_tahun" class="form-label">Tahun</label>
                <select
                  name="tahun"
                  id="tahun"
                  class="form-control"
                  v-model="ref_anggota.tahun"
                >
                  <option value="">Pilih tahun</option>
                  <option
                    v-for="tahun in dt_tahun"
                    :key="tahun.id"
                    :value="tahun.id"
                  >
                    {{ tahun.tahun }}
                  </option>
                </select>
              </div>
              <div class="mb-3">
                <label for="bulan" class="form-label">Bulan</label>
                <select
                  name="bulan"
                  id="bulan"
                  class="form-control"
                  v-model="ref_anggota.bulan"
                >
                  <option value="">Pilih bulan</option>
                  <option
                    v-for="bulan in dt_bulan"
                    :key="bulan.id"
                    :value="bulan.id"
                  >
                    {{ bulan.bulan }}
                  </option>
                </select>
              </div>
              <div class="mb-3">
                <label for="tipe" class="form-label">Tipe Transaksi</label>
                <select
                  name="tipe"
                  id="tipe_transaksi"
                  class="form-control"
                  v-model="ref_anggota.tipe_transaksi"
                >
                  <option value="">Pilih tipe transaksi</option>
                  <option value="pemasukan">Pemasukan</option>
                  <option value="pengeluaran">Pengeluaran</option>
                </select>
              </div>
              <div class="mb-3">
                <label for="nominal" class="form-label"
                  >Nominal Pembayaran</label
                >
                <input
                  type="text"
                  class="form-control"
                  id="nominal"
                  placeholder="Masukan nominal pembayaran"
                  v-model="ref_anggota.nominal"
                />
              </div>
              <div class="mb-3" id="d-keterangan" style="display: none">
                <label for="nominal" class="form-label">Keterangan</label>
                <textarea
                  class="form-control"
                  name="keterangan"
                  id="keterangan"
                  cols="30"
                  rows="3"
                  v-model="ref_anggota.keterangan"
                  placeholder="Masukan keterangan"
                ></textarea>
              </div>
              <button type="submit" class="btn btn-primary">Simpan</button>
            </form>
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
import Swal from "sweetalert2";

export default {
  name: "Kas_form",
  components: {
    Sidebar,
    Header,
  },
  data() {
    return {
      dt_anggota: [],
      dt_tahun: [],
      dt_bulan: [],
      ref_anggota: {
        anggota: "",
        tahun: "",
        bulan: "",
        tipe_transaksi: "",
        nominal: "",
        keterangan: "",
      },
    };
  },
  created() {
    this.getDataAnggota();
    this.getDataTahun();
    this.getDataBulan();
  },
  methods: {
    async getDataAnggota() {
      const respon = await axios.get(this.$api + `get-anggota`);
      this.dt_anggota = respon.data;
    },
    async getDataTahun() {
      const respon = await axios.get(this.$api + `get-tahun`);
      this.dt_tahun = respon.data;
    },
    async getDataBulan() {
      const respon = await axios.get(this.$api + `get-bulan`);
      this.dt_bulan = respon.data;
    },
    async TambahPembayaran() {
      try {
        let anggota_arr = this.ref_anggota.anggota.split("_");
        const response = await axios.post(this.$api + `pembayaran`, {
          anggota_id: anggota_arr[0],
          tahun_id: this.ref_anggota.tahun,
          bulan_id: this.ref_anggota.bulan,
          tipe_transaksi: this.ref_anggota.tipe_transaksi,
          nominal: this.ref_anggota.nominal,
          keterangan: this.ref_anggota.keterangan,
        });
        if (response.data.status == 200) {
          Swal.fire({
            title: "Berhasil",
            text: response.data.message,
            icon: "success",
            timer: 3000,
          });
          setTimeout(() => {
            this.$router.push("home");
          }, 1500);
        } else if (response.data.status == 400) {
          Swal.fire({
            title: "Gagal",
            text: response.data.message,
            icon: "warning",
            // timer: 3000,
          });
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
  mounted() {
    let anggota = $("#anggota");
    let nominal = $("#nominal");
    let tipe_transaksi = $("#tipe_transaksi");
    let d_keterangan = $("#d-keterangan");
    anggota.change(function () {
      let anggota = $(this).val();
      let biaya = anggota.split("_");
      nominal.val(biaya[1]);
    });

    tipe_transaksi.change(function () {
      if ($(this).val() == "pengeluaran") {
        d_keterangan.show();
      } else {
        d_keterangan.hide();
      }
    });
  },
};
</script>
