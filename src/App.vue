<script>
import { RouterView } from 'vue-router'
import Navigation from '../src/components/shared/Navigation/Navigation.vue';
import Footer from '../src/components/shared/Footer/Footer.vue';
export default {
  name: 'App',
  components: {
    Navigation,
    Footer
  },
  data() {
    return {
      productDetails: []
    }
  },
  methods: {
    handleProductDetails(product) {
      console.log(product);
      this.productDetails = product;
    }
  }
}
</script>

<template>
  <Navigation></Navigation>
  <RouterView 
  ></RouterView>
  <Footer></Footer>

  <!-- Back to Top -->
  <a href="#" class="btn btn-primary border-3 border-primary rounded-circle back-to-top"><i
      class="fa fa-arrow-up"></i></a>

</template>

<style scoped></style>
