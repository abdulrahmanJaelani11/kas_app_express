import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "@fortawesome/fontawesome-free/css/all.css";
// import MyJs from `../public/assets/js/my_main`

const app = createApp(App);
// app.mixin(MyJs);
// app.config.globalProperties.$api = "https://api-kas-express.vercel.app/";
app.config.globalProperties.$api = "http://192.168.0.135:3001/";
// app.config.globalProperties.$api = "http://localhost:3001/";

app.use(router).mount("#app");
