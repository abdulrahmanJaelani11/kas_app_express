import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "@fortawesome/fontawesome-free/css/all.css";
// import MyJs from `../public/assets/js/my_main`

const app = createApp(App);
// app.mixin(MyJs);
app.config.globalProperties.$api = "api-kas-express2.vercel.app/api/";
// app.config.globalProperties.$api = "http://192.168.230.86:3001/";
// app.config.globalProperties.$api = "http://localhost:3000/api/";

app.use(router).mount("#app");
