import { createWebHistory, createRouter } from "vue-router";
import Home from "./views/Home.vue";
import Contacts from "./views/Contacts.vue";
import AboutUs from "./views/AboutUs.vue";

import Login from "./views/Login.vue";
import Register from "./views/Register.vue";

import CreateEvent from "./views/CreateEvent.vue";

// lazy-loaded
const Profile = () => import("./views/Profile.vue")

//account role specific pages
//const BoardAdmin = () => import("./views/BoardAdmin.vue")
const ModStaff = () => import("./views/ModBoard.vue")
const BoardUser = () => import("./views/UserBoard.vue")

//community based pages
const Events = () => import("./views/Events.vue")
const EditEvent = () => import("./views/EditEvent.vue")
const EventDetailed = () => import("./views/EventDetailed.vue")

const Activities = () => import("./views/Activities.vue")
const Clubs = () => import("./views/Clubs.vue")
const Movies = () => import("./views/Movies.vue")
const Restaurants = () => import("./views/Restaurants.vue")

const routes = [
  //public pages
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/home",
    component: Home,
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/register",
    component: Register,
  },
  {
    path: "/aboutUs",
    component: AboutUs,
  },  {
    path: "/contacts",
    component: Contacts,
  },

  //logged in users profile page
  {
    path: "/profile",
    name: "profile",
    // lazy-loaded
    component: Profile,
  },
  
  //account role specific pages
  {
    path: "/mod",
    name: "moderator",
    component: ModStaff,
  },
  {
    path: "/user",
    name: "user",
    component: BoardUser,
  },

  //community based pages
  {
    path: "/events",
    name: "events",
    component: Events,
  },
  {
    path: "/eventDetailed",
    name: "eventDetailed",
    component: EventDetailed,
  },  
  {
    path: "/createEvent",
    component: CreateEvent,
  },
  {
    path: "/editEvent",
    name: "editEvent",
    component: EditEvent,
  },  

  {
    path: "/activities",
    name: "activities",
    component: Activities,
  },
  {
    path: "/clubs",
    name: "clubs",
    component: Clubs,
  },
  {
    path: "/movies",
    name: "movies",
    component: Movies,
  },
  {
    path: "/restaurants",
    name: "restaurants",
    component: Restaurants,
  },

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});


router.beforeEach((to, from, next) => {
    const publicPages = ['/login', '/register', '/home', '/contacts', '/aboutUs'];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = localStorage.getItem('user');
  
    // trying to access a restricted page + not logged in
    // redirect to login page
    if (authRequired && !loggedIn) {
      next('/login');
    } else {
      next();
    }
  });

export default router;