<!-- Site wide css. Contains navigation bar that will be used on every page. Will contain footer in the future. -->
<template>
  <div id="app" class="d-flex flex-column min-vh-100">
    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <a href class="navbar-brand" @click.prevent>Manzanita</a>
      <div class="navbar-nav mr-auto">
      <!-- Public Pages -->
        <li v-if="!currentUser" class="nav-item">
          <router-link to="/home" class="nav-link">
            <font-awesome-icon icon="home" /> Home
          </router-link>
        </li>
        <li v-if="!currentUser" class="nav-item">
          <router-link to="/aboutUs" class="nav-link">
            <font-awesome-icon icon="info" /> About Us
          </router-link>
        </li>
        <li v-if="!currentUser" class="nav-item">
          <router-link to="/contacts" class="nav-link">
            <font-awesome-icon icon="at" /> Contacts
          </router-link>
        </li>
        <!-- Account Privilege based Pages -->
        <li v-if="showAdmin" class="nav-item">
          <router-link to="/admin" class="nav-link">Admin Board</router-link>
        </li>
        <li v-if="showModerator" class="nav-item">
          <router-link to="/mod" class="nav-link">Moderator Board</router-link>
        </li>
        <li v-if="currentUser" class="nav-item">
          <router-link to="/user" class="nav-link">User</router-link>
        </li>
        <li v-if="currentUser" class="nav-item"><router-link to="/events" class="nav-link">Events</router-link></li>
        <li v-if="currentUser" class="nav-item"><router-link to="/activities" class="nav-link">Activities</router-link></li>
        <li v-if="currentUser" class="nav-item"><router-link to="/clubs" class="nav-link">Clubs</router-link></li>
        <li v-if="currentUser" class="nav-item"><router-link to="/movies" class="nav-link">Movies</router-link></li>
        <li v-if="currentUser" class="nav-item"><router-link to="/restaurants" class="nav-link">Restaurants</router-link></li>
      </div>

      <!-- Account Creation and Login/Logout Actions -->
      <div class="navbar-nav ml-auto">
        <li v-if="showAdmin" class="nav-item">
          <router-link to="/register" class="nav-link">
            <font-awesome-icon icon="user-plus" />Register Account
          </router-link>
        </li>
        <li v-if="!currentUser" class="nav-item">
          <router-link to="/login" class="nav-link">
            <font-awesome-icon icon="sign-in-alt" />Login
          </router-link>
        </li>
        <li v-if="currentUser" class="nav-item">
          <router-link to="/profile" class="nav-link">
            <font-awesome-icon icon="user" />
            {{ currentUser.username }}
          </router-link>
        </li>
        <li v-if="currentUser" class="nav-item">
          <a class="nav-link" href @click.prevent="logOut">
            <font-awesome-icon icon="sign-out-alt" />LogOut
          </a>
        </li>
      </div>

    </nav>

    <div class="container">
      <router-view />
    </div>
  </div>
<br><br><br>
<footer class="bg-light pb-5 mt-auto">
  <div class="container text-center">
    <p class="font-italic text-muted mb-0">&copy; Where any copyright claims can be reserved </p>
  </div>
</footer>
</template>

<script>
export default {
  //return user if one is logged in
  computed: {
    currentUser() {          //if parameters are met, then there is a current user logged in
      return this.$store.state.auth.user;
    },
    showAdmin() {        //if parameters are met, then current user is an admin
      if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes('ROLE_ADMIN');
      }

      return false;
    },
    showModerator() {    //if parameters are met, then current user is a moderator
      if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes('ROLE_MODERATOR');
      }

      return false;
    }
  },
  methods: {    // method used for logging out
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    }
  }
};
</script>