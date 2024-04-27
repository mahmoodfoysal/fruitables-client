<script>
import { RouterView } from 'vue-router'
import Navigation from '../src/components/shared/Navigation/Navigation.vue';
import Footer from '../src/components/shared/Footer/Footer.vue';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import initilizationAuthentication from './firebase/firebase.init';
import { useStore } from '../src/store/taskStore.js';
initilizationAuthentication();
const auth = getAuth();
export default {
  name: 'App',
  components: {
    Navigation,
    Footer
  },
  data() {
    return {
      store: useStore(),
    }
  },
  mounted() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.store.setUser(user);
        // console.log(user)
        const uid = user.uid;
      } else {

      }
    });
  },
  methods: {
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    },
  },
  created() {
    // Watch for changes in authentication state
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        this.store.setUser(user);
        // if(sessionStorage.getItem('user') || this.store.user) {
        //   this.$router.push({name: 'Home'})
        // }

      } else {
        // User is signed out
        // ...
      }
    });
  },
}
</script>

<template>
  <Navigation></Navigation>
  <RouterView></RouterView>
  <Footer></Footer>

  <!-- Back to Top -->
  <button 
  @click="scrollToTop" 
  type="button" 
  class="btn btn-primary border-3 border-primary rounded-circle back-to-top">
  <i
  class="fa fa-arrow-up"
  ></i>
  </button>

</template>

<style scoped></style>
