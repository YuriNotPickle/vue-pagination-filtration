<template>
  <div class="d-flex align-items-center justify-content-center">
    <button
      class="btn btn-primary m-1"
      v-for="page in pagesQuanity"
      :key="page"
      @click="pageSelect(page)"
    >
      {{ page }}
    </button>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["pagesQuanity"]),
  },
  methods: {
    ...mapActions(["setPage"]),
    pageSelect(page) {
      this.setPage(page);
    },
  },
};
</script>
<style></style>
