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
        <div v-if="loading" class="loading-overlay">
          <span>Loading...</span>
        </div>
        <div class="row">
          <div class="col-12">
            <div class="card">
              <div class="card-title text-center fw-semibold mb-3">
                Pembayaran sekaligus
              </div>
              <form action="" class="p-4" @submit.prevent="TambahPembayaran()">
                <div class="mb-3">
                  <label for="anggota" class="form-label"
                    ><i class="ti ti-user"></i> Anggota</label
                  >
                  <select
                    name="anggota"
                    id="anggota"
                    class="form-control"
                    aria-placeholder="Pilih Anggota"
                    v-model="ref_anggota.anggota"
                    @change="clear()"
                  >
                    <option value="">Pilih anggota</option>
                    <option
                      v-for="anggota in dt_anggota"
                      :key="anggota.id"
                      :value="anggota.id"
                    >
                      {{ anggota.nama }}
                    </option>
                  </select>
                </div>
                <div class="mb-3">
                  <label for="tahun2" class="form-label"
                    ><i class="ti ti-calendar"></i> Tahun</label
                  >
                  <select
                    name="tahun2"
                    id="tahun2"
                    class="form-control"
                    v-model="ref_anggota.tahun"
                    @change="getTotalTagihan()"
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
                  <label for="total" class="form-label"
                    ><i class="ti ti-coin"></i> Total tagihan</label
                  >
                  <input
                    type="text"
                    name="tot_tagihan"
                    id="tot_tagihan"
                    class="form-control"
                    placeholder="Total tagihan"
                    v-model="ref_anggota.tot_tagihan"
                    readonly
                  />
                </div>
                <div class="mb-3">
                  <button
                    class="btn btn-primary w-100"
                    v-if="ref_anggota.tot_tagihan > 0"
                  >
                    <i class="fa fa-fw fa-edit"></i> Simpan
                  </button>
                  <button
                    class="btn btn-primary w-100"
                    disabled
                    v-if="ref_anggota.tot_tagihan == 0"
                  >
                    <i class="fa fa-fw fa-edit"></i> Simpan
                  </button>
                  <small
                    v-if="
                      ref_anggota.tot_tagihan == 0 &&
                      ref_anggota.anggota != 0 &&
                      ref_anggota.tahun != 0
                    "
                    class="text-center"
                    >Telah Lunas</small
                  >
                </div>
              </form>
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
  name: "BayarKasSekaligus",
  components: {
    Sidebar,
    Header,
  },
  data() {
    return {
      dt_anggota: [],
      dt_tahun: [],
      ref_anggota: {
        anggota: "",
        tahun: "",
        tot_tagihan: "",
      },
      loading: false,
    };
  },
  created() {
    this.getDataAnggota();
    this.getDataTahun();
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
    async getTotalTagihan() {
      try {
        if (this.ref_anggota.anggota != "") {
          this.loading = true;
          const response = await axios.get(
            this.$api +
              `get-total-tagihan/${this.ref_anggota.anggota}/${this.ref_anggota.tahun}`
          );
          this.loading = false;
          this.ref_anggota.tot_tagihan = response.data.total_tagihan;
        } else {
          Swal.fire({
            title: "Oppss",
            icon: "error",
            text: "Pilih anggota terlebih dulu!",
          });
          this.ref_anggota.tahun = "";
        }
      } catch (error) {
        console.log(error);
      }
    },
    async TambahPembayaran() {
      try {
        this.loading = true;
        const response = await axios.post(this.$api + `pembayaran-sekaligus`, {
          anggota_id: this.ref_anggota.anggota,
          tahun_id: this.ref_anggota.tahun,
          tot_tagihan: this.ref_anggota.tot_tagihan,
        });
        if (response.data.status == 200) {
          this.loading = false;
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
    clear() {
      this.ref_anggota.tahun = "";
      this.ref_anggota.tot_tagihan = "";
    },
  },
  // mounted() {
  //   let anggota = $("#anggota");
  //   let tahun = $("#tahun2");
  //   tahun.change(function () {
  //     $.ajax({
  //       url: +`get-total-tagihan/` + anggota.val() + "/" + tahun.val(),
  //       type: "GET",
  //       dataType: "JSON",
  //       success: function (response) {
  //         alert(response);
  //         console.log(response);
  //       },
  //     });
  //   });
  // },
};
</script>
