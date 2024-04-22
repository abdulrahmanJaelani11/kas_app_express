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
          <div class="col-12">
            <div class="card">
              <div class="card-body">
                <table class="table">
                  <tbody>
                    <tr>
                      <td class="fw-semibold">
                        <router-link
                          class="text-dark"
                          :to="{ name: 'Kas_form' }"
                          >Pembayaran perbulan</router-link
                        >
                      </td>
                    </tr>
                    <tr>
                      <td class="fw-semibold">
                        <router-link
                          class="text-dark"
                          :to="{ name: 'BayarKasSekaligus' }"
                          >Pembayaran Sekaligus</router-link
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
</template>

<script>
import Sidebar from "@/components/Sidebar.vue";
import Header from "@/components/Header.vue";
import axios from "axios";
import Swal from "sweetalert2";

export default {
  name: "ListTransaksi",
  components: {
    Sidebar,
    Header,
  },
};
</script>
