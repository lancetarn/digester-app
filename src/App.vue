<template>
  <section class="section" id="app">
    <lentil-nav/>
    <router-view/>
  </section>
</template>

<script>
import LentilNav from './components/LentilNav.vue';

export default {
  name: 'Home',
  components: { LentilNav },
};
</script>

<style lang="scss" src="./assets/main.scss"></style>
