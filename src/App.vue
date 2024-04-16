<script>
import Navigation from '../src/components/shared/Navigation/Navigation.vue';
import Home from '../src/components/Home/Home.vue';
import Footer from '../src/components/shared/Footer/Footer.vue';
export default {
  name: 'App',
  components: {
    Navigation,
    Home,
    Footer
  }
}
</script>

<template>
<Navigation></Navigation>
<Home></Home>
<Footer></Footer>

<!-- Back to Top -->
<a href="#" class="btn btn-primary border-3 border-primary rounded-circle back-to-top"><i class="fa fa-arrow-up"></i></a>   

</template>

<style scoped>

</style>
