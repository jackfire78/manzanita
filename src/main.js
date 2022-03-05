import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from './plugins/font-awesome'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'

loadFonts()

/*import and apply
**router for Vue router
**store used for Vuex
**Bootstrap used with CSS/Font-awesome for icons
*/
createApp(App)
  .use(router)
  .use(store)
  .use(vuetify)
  .component("font-awesome-icon", FontAwesomeIcon)
  .mount("#app");
