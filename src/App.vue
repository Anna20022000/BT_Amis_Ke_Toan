<template>
  <div id="app">
    <the-navbar />
    <div class="m-main">
      <the-header />
      <the-content />
    </div>
  </div>
</template>

<script>
import TheNavbar from "./components/layouts/TheNavbar.vue";
import TheHeader from "./components/layouts/TheHeader.vue";
import TheContent from "./components/layouts/TheContent.vue";

export default {
  name: "App",
  components: {
    TheNavbar,
    TheHeader,
    TheContent
  },
};
</script>

<style>
@import url("./assets/css/main.css");
</style>
