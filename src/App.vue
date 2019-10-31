<template>
  <div id="app">
    <toolbar />
    <shelf />
  </div>
</template>

<script>
import toolbar from "./components/Toolbar.vue";
import shelf from "./components/Shelf.vue";

export default {
  name: "app",
  components: {
    toolbar,
    shelf
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
