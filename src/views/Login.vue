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
    <div class="position-relative overflow-hidden radial-gradient min-vh-100">
      <div class="d-flex align-items-center justify-content-center w-100 mt-4">
        <div class="row justify-content-center w-100">
          <div class="col-md-8 col-lg-6 col-xxl-4">
            <div class="card mb-0">
              <div class="card-body">
                <div class="row justify-content-center">
                  <div class="col-3 d-flex align-items-end justify-content-end">
                    <a class="text-nowrap logo-img d-block py-3 w-100">
                      <img
                        src="../../public/assets/images/logos/ebook.png"
                        width="70"
                        alt=""
                      />
                    </a>
                  </div>
                  <div class="col-9 d-flex align-items-center">
                    <h3 class="fw-semibold">Sistem pencatatan uang kas</h3>
                  </div>
                </div>
                <hr class="m-1 p-1" />
                <!-- <p class="text-center">Sistem pencatatan uang kas</p> -->
                <p class="text-center">Selamat Datang, Silahkan Login</p>
                <form @submit.prevent="Login()">
                  <div class="mb-3">
                    <label for="username" class="form-label">Username</label>
                    <input
                      type="text"
                      class="form-control"
                      id="username"
                      aria-describedby="emailHelp"
                      v-model="user.username"
                      placeholder="Masukan username"
                    />
                  </div>
                  <div class="mb-4">
                    <label for="password" class="form-label">Password</label>
                    <input
                      type="password"
                      class="form-control"
                      id="password"
                      v-model="user.password"
                      placeholder="Masukan password"
                    />
                  </div>
                  <div
                    class="d-flex align-items-center justify-content-between mb-4"
                  ></div>
                  <button
                    type="submit"
                    class="btn btn-primary w-100 py-8 fs-4 mb-4 rounded-2"
                  >
                    Login
                  </button>
                  <div class="d-flex align-items-center justify-content-center">
                    <a
                      class="text-primary fw-bold me-2"
                      href="./authentication-register.html"
                      >Buat akun?</a
                    >
                    atau
                    <a
                      class="text-primary fw-bold ms-2"
                      href="./authentication-register.html"
                      >Lupa password?</a
                    >
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Login",
  data() {
    return {
      user: {},
    };
  },
  methods: {
    async Login() {
      try {
        let respon = await axios.post(this.$api + "auth", this.user);
        if (respon.data.status == 200) {
          console.log(respon.data);
          localStorage.setItem("user", btoa(JSON.stringify(respon.data)));
          this.$router.push("home");
        } else if (respon.data.status == 400) {
          alert(respon.data.message);
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
