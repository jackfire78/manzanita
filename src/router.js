import { createWebHistory, createRouter } from "vue-router";
import Home from "./views/Home.vue";
import Contacts from "./views/Contacts.vue";
import AboutUs from "./views/AboutUs.vue";

import Login from "./views/Login.vue";
import Register from "./views/Register.vue";

import CreateEvent from "./views/CreateEvent.vue";
import CreateActivity from "./views/CreateActivity.vue";
//import CreateClub from "./views/CreateClub.vue";
//import CreateMovie from "./views/CreateMovie.vue";
//import CreateRestaurant from "./views/CreateRestaurant.vue";

// lazy-loaded
const Profile = () => import("./views/Profile.vue")

//account role specific pages
//const BoardAdmin = () => import("./views/BoardAdmin.vue")
const ModStaff = () => import("./views/ModBoard.vue")
const BoardUser = () => import("./views/UserBoard.vue")

//community Event pages
const Events = () => import("./views/Events.vue")
const EditEvent = () => import("./views/EditEvent.vue")
const EventDetailed = () => import("./views/EventDetailed.vue")

//community life Activity pages
const Activities = () => import("./views/Activities.vue")
const EditActivity = () => import("./views/EditActivity.vue")
const ActivityDetailed = () => import("./views/ActivityDetailed.vue")

//community life Club pages
const Clubs = () => import("./views/Clubs.vue")

//community life Movie pages
const Movies = () => import("./views/Movies.vue")

//community life Restaurant pages
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

  //Community Event pages
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
    path: "/editEvent/:id",
    name: "editEvent",
    component: EditEvent,
  },  

  //Community Life Activity pages
  {
    path: "/activities",
    name: "activities",
    component: Activities,
  },
  {
    path: "/activityDetailed",
    name: "activityDetailed",
    component: ActivityDetailed,
  },  
  {
    path: "/createActivity",
    component: CreateActivity,
  },
  {
    path: "/editActivity/:id",
    name: "editActivity",
    component: EditActivity,
  },

  //Community Life Club pages
  {
    path: "/clubs",
    name: "clubs",
    component: Clubs,
  },
  
  //Community Life Movie pages
  {
    path: "/movies",
    name: "movies",
    component: Movies,
  },

  //Community Life Restaurant pages
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