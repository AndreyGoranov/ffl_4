import { requestResource } from "../../utils/resourceRequests";
import { GET_RESOURCE_PATH } from "../../common/apiRequests";

const state = {
  loggedUser: null,
  userPlayers: null,
  allUsers: null,
};

const getters = {
  getLoggerUser: (state) => state.loggedUser,
  getUserPlayers: (state) => state.userPlayers,
  getAllUsers: (state) => state.allUsers,
};

const actions = {
  async fetchAllUsers({ commit }) {
    const response = await requestResource({
      resourcePath: GET_RESOURCE_PATH.USER,
    });
    commit("setAllUsers", response?.data?.data);
  },
  async fetchLoggedUser({ commit }) {
    const response = await requestResource({
      resourcePath: GET_RESOURCE_PATH.USER_PROFILE,
    });
    commit("setLoggedUser", response?.data?.data);
  },
  async fetchUser(_, { userId }) {
    const response = await requestResource({
      resourcePath: GET_RESOURCE_PATH.USER,
      mainId: userId,
    });
    return response?.data?.data;
  },
  async fetchUserPlayers({ commit }, { userId, round_id }) {
    const response = await requestResource({
      resourcePath: GET_RESOURCE_PATH.USER_PLAYERS_BY_USER,
      mainId: userId,
      queryParams: { round_id },
    });
    commit("setUserPlayers", response?.data?.data);
  },
};

const mutations = {
  setAllUsers: (state, users) => {
    state.allUsers = users;
  },
  setLoggedUser: (state, u) => {
    state.loggedUser = u;
  },
  setUserPlayers: (state, up) => {
    state.userPlayers = up;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
  namespaced: true,
};