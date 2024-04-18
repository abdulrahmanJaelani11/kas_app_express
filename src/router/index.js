import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Buttons from "../views/Buttons.vue";
import Alerts from "../views/Alerts.vue";
import Cards from "../views/Cards.vue";
import Forms from "../views/Forms.vue";
import Typography from "../views/Typography.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Icons from "../views/Icons.vue";
import SamplePage from "../views/SamplePage.vue";
import Kas_form from "../views/Kas_form.vue";
import Anggota from "../views/Anggota.vue";
import Anggota_form from "../views/Anggota_form.vue";
import Anggota_edit from "../views/Anggota_edit.vue";
import Status from "../views/Status.vue";
import Status_form from "../views/Status_form.vue";
import Status_edit from "../views/Status_edit.vue";
import Riwayat from "../views/Riwayat.vue";
import Setting from "../views/Setting.vue";
import Profile from "../views/Profile.vue";
import DetailPembayaran from "../views/DetailPembayaran.vue";
import Keamanan from "../views/Keamanan.vue";
import DetailTransaksi from "../views/DetailTransaksi.vue";

const routes = [
  {
    path: "/",
    name: "login",
    component: HomeView,
    meta: {
      auth: true,
    },
  },
  {
    path: "/home",
    name: "home",
    component: HomeView,
    meta: {
      auth: true,
    },
  },
  {
    path: "/tambah_kas",
    name: "Kas_form",
    component: Kas_form,
    meta: {
      auth: true,
    },
  },
  {
    path: "/anggota",
    name: "Anggota",
    component: Anggota,
    meta: {
      auth: true,
    },
  },
  {
    path: "/anggota_form",
    name: "Anggota_form",
    component: Anggota_form,
    meta: {
      auth: true,
    },
  },
  {
    path: "/anggota_edit:id",
    name: "Anggota_edit",
    component: Anggota_edit,
    meta: {
      auth: true,
    },
  },
  {
    path: "/status",
    name: "Status",
    component: Status,
    meta: {
      auth: true,
    },
  },
  {
    path: "/status_form",
    name: "Status_form",
    component: Status_form,
    meta: {
      auth: true,
    },
  },
  {
    path: "/status_edit:id",
    name: "Status_edit",
    component: Status_edit,
    meta: {
      auth: true,
    },
  },
  {
    path: "/riwayat",
    name: "Riwayat",
    component: Riwayat,
    meta: {
      auth: true,
    },
  },
  {
    path: "/setting",
    name: "Setting",
    component: Setting,
    meta: {
      auth: true,
    },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      auth: false,
    },
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: {
      auth: true,
    },
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    meta: {
      auth: true,
    },
  },
  {
    path: "/detail-pembayaran:id",
    name: "DetailPembayaran",
    component: DetailPembayaran,
    meta: {
      auth: true,
    },
  },
  {
    path: "/keamanan:id",
    name: "Keamanan",
    component: Keamanan,
    meta: {
      auth: true,
    },
  },
  {
    path: "/detail-transaksi",
    name: "DetailTransaksi",
    component: DetailTransaksi,
    meta: {
      auth: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.auth) {
    let dt_user = JSON.parse(atob(localStorage.getItem("user")));
    if (localStorage.getItem("user") == null) {
      next({ name: "Login" });
    } else {
      // validasi : user dgn role anggota tidak boleh ke form pembayaran
      if (
        to.name == "Kas_form" ||
        to.name == "Anggota_form" ||
        to.name == "Anggota_edit"
      ) {
        if (dt_user.result[0].role_id == 3) {
          next({ name: "home" });
        }
      }
      next();
    }
  } else {
    if (to.name == "Login") {
      if (localStorage.getItem("user") !== null) {
        next({ name: "home" });
      }
    }
    next();
  }
});

export default router;
