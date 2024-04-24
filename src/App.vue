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
  <a href="#" class="btn btn-primary border-3 border-primary rounded-circle back-to-top"><i
      class="fa fa-arrow-up"></i></a>

</template>

<style scoped></style>
