<template>
  <div id="app">
    <toolbar />
    <shelf />
  </div>
</template>
<script>
import toolbar from "../components/Toolbar.vue";
import shelf from "../components/Shelf.vue";

export default {
  name: "app",
  components: {
    toolbar,
    shelf
  }
};
</script>
