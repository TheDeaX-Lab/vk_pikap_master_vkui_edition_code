import React from "react";
import { Component } from "react";
import MainPanel from "./Panels/MainPanel";
import SettingsPanel from "./Panels/SettingsPanel";
import ProfilePanel from "./Panels/ProfilePanel";
import AccessDeniedPanel from "./Panels/AccessDeniedPanel";
import AboutPanel from "./Panels/AboutPanel";
import { View, ScreenSpinner, Epic, Tabbar, TabbarItem } from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";
import vkConnect from "@vkontakte/vk-connect";
import { isUndefined } from "util";
import SearchIcon from "@vkontakte/icons/dist/24/search";
import SettingsIcon from "@vkontakte/icons/dist/24/settings";
import InfoIcon from "@vkontakte/icons/dist/24/info";

const app_id = 7185084;
const v = "5.102";
class App extends Component {
  RandomFromTo(from, to) {
    return Math.ceil(Math.random() * (to - from) + from);
  }
  constructor(props) {
    super(props);
    this.state = {
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
      status: 6,
      rangeDate: [0, 86400],
      q: "",
      filteredUsers: [],
      profile: {},
      transition: false
    };
  }
  onCountryUpdate(country_id) {
    this.setState({ country: country_id });
    this.executeVkApi("database.getCities", { count: 1000, country_id }).then(
      r => this.setState({ cities: r.response.items })
    );
  }
  onCityUpdate(city) {
    this.setState({ city });
  }
  onYearUpdate([from_year, to_year]) {
    this.setState({ from_year, to_year });
  }
  onSexUpdate(sex) {
    this.setState({ sex });
  }
  onStatusUpdate(status) {
    this.setState({ status });
  }
  onQUpdate(q) {
    this.setState({ q });
  }
  onHasPhotoUpdate(has_photo) {
    this.setState({ has_photo });
  }
  onRangeDateUpdate(rangeDate) {
    this.setState({ rangeDate });
  }
  onClear() {
    this.setState({ filteredUsers: [] });
  }
  toAbout() {
    this.setState({ currentPanel: "about", is_loading: true });
  }
  toMain() {
    this.setState({ currentPanel: "main", is_loading: true });
  }
  toSettings() {
    this.setState({ currentPanel: "settings", is_loading: true });
  }
  toProfile(r) {
    this.setState({ profile: r, currentPanel: "profile" });
  }

  render() {
    return (
      <Epic
        theme="client_dark"
        activeStory="main_view"
        tabbar={
          this.state.currentPanel !== "profile" &&
          !this.state.is_loading && (
            <Tabbar>
              <TabbarItem
                onClick={() => this.toSettings()}
                data-story="main_view"
                selected={this.state.currentPanel === "settings"}
                text="Настройки"
              >
                <SettingsIcon />
              </TabbarItem>
              <TabbarItem
                onClick={() => this.toMain()}
                selected={this.state.currentPanel === "main"}
                data-story="main_view"
                text="Поиск"
              >
                <SearchIcon />
              </TabbarItem>
              <TabbarItem
                onClick={() => this.toAbout()}
                selected={this.state.currentPanel === "about"}
                data-story="main_view"
                text="О сервисе"
              >
                <InfoIcon />
              </TabbarItem>
            </Tabbar>
          )
        }
      >
        <View
          activePanel={this.state.currentPanel}
          onTransition={() => this.setState({ is_loading: false })}
          popout={this.state.is_loading && <ScreenSpinner />}
          id="main_view"
        >
          <SettingsPanel
            {...this.state}
            onCityUpdate={r => this.onCityUpdate(r)}
            onCountryUpdate={r => this.onCountryUpdate(r)}
            onYearUpdate={r => this.onYearUpdate(r)}
            onSexUpdate={r => this.onSexUpdate(r)}
            onStatusUpdate={r => this.onStatusUpdate(r)}
            onQUpdate={r => this.onQUpdate(r)}
            onHasPhotoUpdate={r => this.onHasPhotoUpdate(r)}
            onRangeDateUpdate={r => this.onRangeDateUpdate(r)}
            onBack={() => this.toMain()}
            id="settings"
          />
          <MainPanel
            {...this.state}
            onProfile={r => this.toProfile(r)}
            onSearch={() => this.searchUsers()}
            onClear={() => this.onClear()}
            onSettings={() => this.toSettings()}
            id="main"
          />

          <AccessDeniedPanel onBack={() => this.authUser()} id="denied" />
          <ProfilePanel
            profile={this.state.profile}
            onBack={() => this.toMain()}
            id="profile"
          />
          <AboutPanel id="about" />
        </View>
      </Epic>
    );
  }
  authUser() {
    this.setState({ currentPanel: "main", is_loading: true });
    vkConnect
      .sendPromise("VKWebAppGetAuthToken", { app_id, scope: "friends" })
      .then(r => {
        this.setState({ token: r.access_token, is_loading: false });
        this.executeVkApi("database.getCountries", { count: 1000 }).then(r =>
          this.setState({ countrys: r.response.items })
        );
        vkConnect.sendPromise("VKWebAppGetUserInfo", {}).then(r => {
          if (r.country) {
            this.onCountryUpdate(r.country.id);
          }
          if (r.city) {
            this.onCityUpdate(r.city.id);
          }
          this.setState({ sex: !!r.sex ? (r.sex === 1 ? 2 : 1) : 0 });
          this.setState({ current_id: r.id });
        });
      })
      .catch(() => this.setState({ currentPanel: "denied" }));
  }
  componentDidMount() {
    this.authUser();
  }
  appendUsers(arr, from_to_year) {
    this.setState(state => {
      const result = [];
      const map = new Set();
      for (const item of [
        ...state.filteredUsers,
        ...arr
          .filter(r => {
            return (
              !r.blacklisted_by_me &&
              !r.blacklisted &&
              r.can_send_friend_request &&
              r.can_write_private_message &&
              (!isUndefined(r.last_seen)
                ? this.state.rangeDate[0] <=
                    Date.now() / 1000 - r.last_seen.time &&
                  Date.now() / 1000 - r.last_seen.time <=
                    this.state.rangeDate[1]
                : true) &&
              !r.is_closed
            );
          })
          .map(r => {
            r.oleg = this.RandomFromTo(0, 100);
            r.drugs = this.RandomFromTo(0, 100);
            r.sex_completed = this.RandomFromTo(0, 50);
            r.sex_saved = this.RandomFromTo(0, 100);
            r.iq = this.RandomFromTo(0, 100);
            r.size = this.RandomFromTo(0, 500);
            r.kavkaz = this.RandomFromTo(0, 50);
            r.age = this.getYears(r.bdate, from_to_year);
            r.anime = this.RandomFromTo(0, 100);
            r.secondsBefore = Date.now() / 1000 - r.last_seen.time;
            r.timesBefore = [
              Math.floor(r.secondsBefore % 60),
              Math.floor(r.secondsBefore / 60) % 60,
              Math.floor(r.secondsBefore / 3600) % 24,
              Math.floor(r.secondsBefore / 86400)
            ];
            return r;
          })
      ]) {
        if (!map.has(item.id)) {
          map.add(item.id);
          result.push({
            ...item
          });
        }
      }
      return {
        filteredUsers: [...result]
      };
    });
  }
  getYears(v, v1) {
    if (!!v) {
      let date = v.split(".");
      if (date.length === 3) {
        var ageDifMs =
          Date.now() - new Date(date[2], date[1], date[0]).getTime();
        var ageDate = new Date(ageDifMs);
        return Math.abs(ageDate.getUTCFullYear() - 1970);
      }
    }
    return v1;
  }
  searchUsers() {
    this.setState({ is_loading: true, filteredUsers: [] });
    let opts = {
      fields:
        "last_seen,can_write_private_message,can_send_friend_request,blacklisted_by_me,blacklisted,photo_200,bdate,sex",
      sex: this.state.sex,
      status: this.state.status,
      q: this.state.q,
      has_photo: this.state.has_photo,
      country: this.state.country,
      city: this.state.city
    };
    var mass = [];
    var i = this.state.from_year;
    while (i < this.state.to_year) {
      opts.from_year = i;
      opts.to_year = Math.min(i + 25, this.state.to_year);
      mass.push(
        this.executeVkApi("execute.searchFunction", opts).then(r => {
          for (let obj of r.response) {
            this.appendUsers(obj.items, obj.request_id[0]);
          }
        })
      );
      i += 25;
    }
    Promise.all(mass).then(() => this.setState({ is_loading: false }));
  }
  executeVkApi(method, params) {
    return vkConnect
      .sendPromise("VKWebAppCallAPIMethod", {
        method,
        params: { ...params, v, access_token: this.state.token }
      })
      .catch(() => this.executeVkApi(method, params));
  }
}

export default App;
