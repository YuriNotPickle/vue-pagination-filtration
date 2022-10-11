<template>
  <form @submit.prevent>
    <div class="form-row">
      <div class="form-group col-md-3">
        <label for="search-in">Search in</label>
        <select
          id="search-in"
          class="form-control"
          :value="filterParams.column"
          @input="updateFilterMethod"
        >
          <option
            v-for="(name, index) in filtering.filterNames"
            :key="index"
            :value="filtering.filterNames[index]"
          >
            {{ name }}
          </option>
        </select>
      </div>
      <div class="form-group col-md-3">
        <label for="filter-by">Filter by</label>
        <select
          id="filter-by"
          class="form-control"
          :value="filterParams.type"
          @input="updateFilterMethod"
        >
          <option
            v-for="(name, index) in filtering.filterTypes"
            :key="index"
            :value="filtering.filterTypes[index]"
          >
            {{ name }}
          </option>
        </select>
      </div>
      <div class="form-group col-md-6">
        <label for="input-value">Value</label>
        <input
          type="text"
          class="form-control"
          id="input-value"
          :value="filterParams.inputValue"
          @input="updateFilterMethod"
        />
      </div>
    </div>
  </form>
</template>
<script>
import { mapActions, mapState } from "vuex";
export default {
  computed: {
    ...mapState(["filtering"]),
    filterParams() {
      return this.filtering.filterParams;
    },
  },
  methods: {
    ...mapActions(["setFilteringCol", "setPage"]),
    updateFilterMethod(e) {
      this.setPage(1);
      this.setFilteringCol({ type: e.target.id, data: e.target.value });
    },
  },
};
</script>
<style></style>
