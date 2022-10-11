<template>
  <div>
    <app-filters />
    <table class="table">
      <thead>
        <tr>
          <th scope="col" v-for="(name, index) in columns" :key="index">
            {{ name }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in filter" :key="index">
          <th scope="row" v-for="(string, index) in row" :key="index">
            {{ string }}
          </th>
        </tr>
      </tbody>
    </table>
    {{ filter }}
  </div>
</template>
<script>
import { mapState, mapGetters } from "vuex";
import AppFilters from "./AppFilters.vue";
export default {
  components: {
    AppFilters,
  },
  computed: {
    ...mapState(["filteredTable", "columns"]),
    ...mapGetters(["filter"]),
  },
};
</script>
<style></style>
