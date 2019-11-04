import Vue from "vue";
import Vuex from "vuex";
import vkConnect from "@vkontakte/vk-connect";

Vue.use(Vuex);

var app_id = 7185084;
export default new Vuex.Store({
  state: {
    token: "",
    from_year: 15,
    to_year: 16,
    sex: 0,
    has_photo: 1,
    is_loading: false,
    countrys: [],
    cities: [],
    country: "",
    city: "",
    region: "",
    current_id: 0,
    currentPanel: "main",
    currentView: "main_view",
    status: 6,
    rangeDate: [0, 86400],
    blacklisted: 0,
    blacklisted_by_me: 0,
    can_send_friend_request: 1,
    can_write_private_message: 1,
    is_closed: 0,
    dateNeeded: 1,
    blacklisted_needed: 1,
    blacklisted_by_me_needed: 1,
    can_send_friend_request_needed: 1,
    can_write_private_message_needed: 1,
    is_closed_needed: 1,
    q: "",
    arr: [],
    profile: {},
    popout: ""
  },
  getters: {
    filteredUsers(state) {},
    cities(state) {}
  },
  mutations: {
    setState(state, payload) {
      state = { ...state, ...payload };
    }
  },
  actions: {
    authUser({ commit, dispatch }) {
      commit("setState", { currentPanel: "main", is_loading: true });
      vkConnect
        .sendPromise("VKWebAppGetAuthToken", {
          app_id,
          scope: "friends,stories"
        })
        .then(r => {
          commit("setState", { token: r.access_token, is_loading: false });
          this.executeVkApi("database.getCountries", { count: 1000 }).then(r =>
            commit("setState", { countrys: r.response.items })
          );
          vkConnect.sendPromise("VKWebAppGetUserInfo", {}).then(r => {
            if (r.country) {
              commit("setState", { country: r.country.id });
            }
            if (r.city) {
              commit("setState", { city: r.city.id });
            }
            commit("setState", { sex: !!r.sex ? (r.sex === 1 ? 2 : 1) : 0 });
            commit("setState", { current_id: r.id });
          });
        })
        .catch(() =>
          commit("setState", { currentPanel: "denied", is_loading: false })
        );
    }
  },
  updateCities({ commit }, country_id) {
    this.executeVkApi("database.getCities", { count: 1000, country_id }).then(
      r => commit("setState", { cities: r.response.items })
    );
  },
  executeVkApi() {}
});
