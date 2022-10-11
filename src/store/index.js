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
    serverTable: [
      {
        date: "07.06.2001",
        name: "lorem",
        quanity: "10",
        distance: "25 km",
      },
      {
        date: "03.02.2021",
        name: "ipsum",
        quanity: "150",
        distance: "2 km",
      },
      {
        date: "03.02.2002",
        name: "dolor",
        quanity: "30",
        distance: "20 km",
      },
      {
        date: "07.06.2001",
        name: "emst",
        quanity: "1",
        distance: "25 km",
      },
      {
        date: "13.05.2008",
        name: "quiet",
        quanity: "56",
        distance: "53 km",
      },
      {
        date: "02.05.2021",
        name: "consectetur",
        quanity: "1",
        distance: "35 km",
      },
      {
        date: "22.11.2020",
        name: "ultricies ",
        quanity: "15",
        distance: "235 km",
      },

      {
        date: "07.06.2001",
        name: "lorem",
        quanity: "10",
        distance: "25 km",
      },
      {
        date: "03.02.2021",
        name: "ipsum",
        quanity: "150",
        distance: "2 km",
      },
      {
        date: "03.02.2002",
        name: "dolor",
        quanity: "30",
        distance: "20 km",
      },
      {
        date: "07.06.2001",
        name: "emst",
        quanity: "1",
        distance: "25 km",
      },
      {
        date: "13.05.2008",
        name: "quiet",
        quanity: "56",
        distance: "53 km",
      },
      {
        date: "02.05.2021",
        name: "consectetur",
        quanity: "1",
        distance: "35 km",
      },
      {
        date: "22.11.2020",
        name: "ultricies ",
        quanity: "15",
        distance: "235 km",
      },
    ],
    pagination: {
      rowsPerPage: 5,
      currentPage: 1,
    },
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
  },
  actions: {
    setFilteringCol({ commit }, value) {
      commit("setFilteringCol", value);
    },
    setPage({ commit }, value) {
      commit("setPage", value);
    },
  },
  strict: process.env.NODE_ENV !== "production",
});
