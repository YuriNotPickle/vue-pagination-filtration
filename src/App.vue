<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <app-table />
  </div>
</template>

<script>
import AppTable from "./components/AppTable.vue";

export default {
  name: "App",
  components: {
    AppTable,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  width: 70vw;
  margin-left: auto;
  margin-right: auto;
}
</style>
