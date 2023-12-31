<template>
    <head>
    <link rel="stylesheet" href="https://api.ssps.cajthaml.eu/file/64d9f18f79dad891e8a07c73">
  </head>
  <body>
    <Header :showHeader="shouldShowHeader" />
    <router-view />
  </body>
</template>

<script>
import Header from './components/Header.vue';

export default{
  components: {
    Header,
  },
  computed: {
    shouldShowHeader() {
      return this.$route.path !== '/sign-in' && this.$route.path !== '/register';
    },
  },
  mounted() {
    document.title = 'Krooby Type';
  },
};
</script>

<style>
body{
  background-color: rgb(59, 59, 59);
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
</style>