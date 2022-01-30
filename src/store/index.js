import { createStore } from "vuex";
import { auth } from "./auth.module";
//used as a container to hold the application state
//reactive meaning component retrieved can be updated if state changes
const store = createStore({
  modules: {
    auth,
  },
});

export default store;