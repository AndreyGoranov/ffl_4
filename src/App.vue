<template>
  <v-app>
    <v-main>
      <v-row :no-gutters="true">
        <v-col>
          <NavBar />
        </v-col>
      </v-row>
      <div id="app">
        <Header />
        <v-btn @click.prevent="logIn" color="green" class="ml-16"
          >Temp Log In</v-btn
        >
        <!-- <Logos /> -->
        <div class="content-wrapper" transition="slide-x-transition">
          <router-view />
        </div>
        <!-- <Footer /> -->
      </div>
    </v-main>
    <Notification />
  </v-app>
</template>

<script>
import axios from "axios";
import NavBar from "./components/NavBar.vue";
import Header from "./components/common/Header";
import Notification from "./components/common/Notification";
// import Logos from "./components/common/Logos/Logos";
// import Logos from "./components/common/Logos/Logos";

export default {
  name: "App",
  components: {
    Header,
    // Footer,
    Notification,
    NavBar,
  },

  data: () => ({}),
  methods: {
    logIn() {
      let data = JSON.stringify({
        email: "superadmin@info.dev",
        password: "password",
      });

      let config = {
        method: "post",
        url: "https://api.ff-legends.com/api/login",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        data: data,
      };

      axios(config)
        .then(function (response) {
          localStorage.setItem("Access-Token", response.data.data.accessToken);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
  computed: {},
};
</script>

<style lang="scss">
.up {
  text-transform: uppercase;
}
.theme--light.v-application {
  background: #eaeaea !important;
}
#app {
  background-color: lightgrey;
}

.content-wrapper {
  margin: 0 100px;
}
</style>
