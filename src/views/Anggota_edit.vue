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

      <div class="container-fluid">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title fw-semibold mb-4">Edit Anggota</h5>
            <form @submit.prevent="EditAnggota()">
              <div class="mb-3">
                <label for="nama_anggota" class="form-label"
                  >Nama anggota
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="nama_anggota"
                  placeholder="Ketikan nama anggota"
                  aria-describedby="namaAnggota"
                  v-model="nama_anggota"
                />
                <!-- <div id="namaAnggota" class="form-text">
                    We'll never share your email with anyone else.
                  </div> -->
              </div>
              <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label"
                  >Status</label
                >
                <select
                  name="status"
                  id="status"
                  class="form-control"
                  v-model="status"
                >
                  <option value="">Pilih Status</option>
                  <option value="1">Karyawan</option>
                  <option value="2">Siswa/Mahasiswa</option>
                </select>
              </div>
              <button type="submit" class="btn btn-primary">Submit</button>
            </form>
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
import Header from "@/components/Header.vue";
import axios from "axios";
import Swal from "sweetalert2";

export default {
  name: "Anggota_edit",
  components: {
    Sidebar,
    Header,
  },
  data() {
    return {
      nama_anggota: "",
      status: "",
    };
  },
  created() {
    this.getAnggota();
  },
  methods: {
    async EditAnggota() {
      try {
        const response = await axios.put(
          this.$api + `anggota/${this.$route.params.id}`,
          {
            anggota: this.nama_anggota,
            status: this.status,
          }
        );
        if (response.data.status == 200) {
          Swal.fire({
            icon: "success",
            title: "Berhasil",
            text: response.data.message,
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000, // Durasi tampilan toast dalam milidetik (3 detik dalam contoh ini)
          });
          this.$router.push("Anggota");
        }
      } catch (error) {
        console.log(error);
      }
    },
    async getAnggota() {
      try {
        const response = await axios.get(
          this.$api + `get-anggota/${this.$route.params.id}`
        );
        this.nama_anggota = response.data.nama;
        this.status = response.data.status_id;
      } catch (error) {
        console.log(error);
      }
    },
    async getDataStatus() {
      const respon = await axios.get(this.$api + `get-status`);
      this.dt_bulan = respon.data;
    },
  },
};
</script>
