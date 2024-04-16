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

      <div class="container pt-3 pb-5">
        <!-- <h5 style="font-weight: bold">Daftar Anggota</h5> -->
        <div class="row">
          <div class="col-12">
            <h5 class="fw-semibold text-center">
              <i class="ti ti-arrow-up-left text-success"></i
              ><i class="ti-exchange-vertical text-success"></i>Detail transaksi
              perhari
            </h5>
          </div>
          <div class="col-12">
            <table class="table">
              <tbody>
                <tr v-for="det in dt_det" :key="det.nominal">
                  <td>
                    <p class="text-center fs-2">{{ det.tgl }}</p>
                    <div class="row">
                      <div class="col-6 text-center">
                        <span class="d-block fw-semibold fs-2"
                          ><i class="ti ti-arrow-up-left text-success"></i>
                          Pemasukan</span
                        >
                        <span class="fs-2"> {{ det.pemasukan }}</span>
                      </div>
                      <div class="col-6 text-center">
                        <span class="d-block fw-semibold fs-2"
                          ><i class="ti ti-arrow-down-right text-danger"></i
                          >Pengeluaran</span
                        >
                        <span class="fs-2">{{ det.pengeluaran }}</span>
                      </div>
                    </div>
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
import Swal from "sweetalert2";

export default {
  name: "DetailTransaksi",
  components: {
    Sidebar,
    Header,
  },
  data() {
    return {
      dt_det: [],
    };
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      try {
        let result = [];
        const response = await axios.get(this.$api + `get-detail-transaksi`);
        console.log(response.data);
        for (let i = 0; i < response.data.length; i++) {
          result.push({
            tgl: response.data[i].tgl,
            pemasukan:
              response.data[i].pemasukan != null
                ? parseInt(response.data[i].pemasukan).toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  })
                : 0,
            pengeluaran:
              response.data[i].pengeluaran != null
                ? parseInt(response.data[i].pengeluaran).toLocaleString(
                    "id-ID",
                    {
                      style: "currency",
                      currency: "IDR",
                    }
                  )
                : 0,
          });
        }
        console.log(result);
        this.dt_det = result;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
