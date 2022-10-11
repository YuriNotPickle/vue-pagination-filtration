import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    filtering: {
      filterNames: ["Name", "Quanity", "Distance"],
      filterTypes: ["Equal", "Contains", "Longer then", "Shorter then"],
      filterParams: {
        column: "Name",
        type: "Contains",
        inputValue: "",
      },
    },
    columns: ["Date", "Name", "Quanity", "Distance"],
    serverTable: [],
    pagination: {
      rowsPerPage: 5,
      currentPage: 1,
    },
    dataLoaded: false,
  },
  getters: {
    serchIn(state) {
      switch (state.filtering.filterParams.column) {
        case "Name":
          return "name";
        case "Quanity":
          return "quanity";
        case "Distance":
          return "distance";
      }
    },
    inputValue(state) {
      return state.filtering.filterParams.inputValue;
    },
    filter(state, getters) {
      switch (state.filtering.filterParams.type) {
        case "Equal":
          return getters.filterEqual;
        case "Contains":
          return getters.filterContains;
        case "Longer then":
          return getters.filterLonger;
        case "Shorter then":
          return getters.filterShorter;
      }
    },
    filterContains(state, getters) {
      return state.serverTable.filter((item) =>
        item[getters.serchIn]
          .toLowerCase()
          .includes(getters.inputValue.toLowerCase())
      );
    },
    filterEqual(state, getters) {
      return state.serverTable.filter((item) => {
        if (getters.inputValue.length > 0) {
          return (
            item[getters.serchIn].toLowerCase().trim() ===
            getters.inputValue.toLowerCase().trim()
          );
        }
        return true;
      });
    },
    filterLonger(state, getters) {
      return state.serverTable.filter((item) => {
        if (getters.inputValue.length > 0) {
          if (isNaN(parseInt(item[getters.serchIn]))) {
            return (
              item[getters.serchIn].toLowerCase().length >
              getters.inputValue.toLowerCase()
            );
          }
          return (
            parseInt(item[getters.serchIn]) >
            parseInt(getters.inputValue.toLowerCase())
          );
        }
        return true;
      });
    },
    filterShorter(state, getters) {
      return state.serverTable.filter((item) => {
        if (getters.inputValue.length > 0) {
          if (isNaN(parseInt(item[getters.serchIn]))) {
            return (
              item[getters.serchIn].toLowerCase().length <
              getters.inputValue.toLowerCase()
            );
          }
          return (
            parseInt(item[getters.serchIn]) <
            parseInt(getters.inputValue.toLowerCase())
          );
        }
        return true;
      });
    },
    tableLength(state, getters) {
      return getters.filter.length;
    },
    pagesQuanity(state, getters) {
      return Math.ceil(getters.tableLength / state.pagination.rowsPerPage);
    },
    paginatedRow(state, getters) {
      let from =
        (state.pagination.currentPage - 1) * state.pagination.rowsPerPage;
      let to = from + state.pagination.rowsPerPage;
      return getters.filter.slice(from, to);
    },
  },
  mutations: {
    setFilteringCol(state, value) {
      if (value.type === "search-in")
        state.filtering.filterParams.column = value.data;
      if (value.type === "filter-by")
        state.filtering.filterParams.type = value.data;
      if (value.type == "input-value")
        state.filtering.filterParams.inputValue = value.data;
    },
    setPage(state, value) {
      state.pagination.currentPage = value;
    },
    setTable(state, value) {
      state.serverTable = value;
    },
    dataLoaded(state) {
      state.dataLoaded = true;
    },
  },
  actions: {
    setFilteringCol({ commit }, value) {
      commit("setFilteringCol", value);
    },
    setPage({ commit }, value) {
      commit("setPage", value);
    },
    async GET_TABLE_FROM_API({ commit }) {
      const response = await fetch(
        "https://my-json-server.typicode.com/YuriNotPickle/vue-pagination-filtration/tableData"
      );
      const data = await response.json();
      commit("setTable", data);
      commit("dataLoaded");
    },
  },
  strict: process.env.NODE_ENV !== "production",
});
