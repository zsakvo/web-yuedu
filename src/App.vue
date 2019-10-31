<template>
  <div id="app">
    <toolbar />
  </div>
</template>

<script>
import toolbar from "./components/Toolbar.vue";

export default {
  name: "app",
  components: {
    toolbar
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0;
}
</style>
