import React from "react";
import { Component } from "react";
import MainPanel from "./Panels/MainPanel";
import SettingsPanel from "./Panels/SettingsPanel";
import ProfilePanel from "./Panels/ProfilePanel";
import AccessDeniedPanel from "./Panels/AccessDeniedPanel";
import { View, ScreenSpinner } from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";
import vkConnect from "@vkontakte/vk-connect";

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
      is_loading: false,
      countrys: [],
      cities: [],
      country: null,
      city: null,
      region: null,
      current_id: 0,
      currentPanel: "main",
      sexs: [
        { id: 0, title: "Любой" },
        { id: 1, title: "Женский" },
        { id: 2, title: "Мужской" }
      ],
      filteredUsers: [],
      profile: {}
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

  render() {
    return (
      <View
        activePanel={this.state.currentPanel}
        popout={this.state.is_loading && <ScreenSpinner />}
      >
        <SettingsPanel
          onCityUpdate={r => this.onCityUpdate(r)}
          onCountryUpdate={r => this.onCountryUpdate(r)}
          onYearUpdate={r => this.onYearUpdate(r)}
          onSexUpdate={r => this.onSexUpdate(r)}
          onBack={() => this.setState({ currentPanel: "main" })}
          sexs={this.state.sexs}
          countrys={this.state.countrys}
          cities={this.state.cities}
          country={this.state.country}
          city={this.state.city}
          sex={this.state.sex}
          from_year={this.state.from_year}
          to_year={this.state.to_year}
          id="settings"
        />
        <MainPanel
          is_loading={this.state.is_loading}
          onProfile={r =>
            this.setState({ profile: r, currentPanel: "profile" })
          }
          onSearch={() => this.searchUsers()}
          onClear={() => this.setState({ filteredUsers: [] })}
          onSettings={() => this.setState({ currentPanel: "settings" })}
          filteredUsers={this.state.filteredUsers}
          id="main"
        />
        <AccessDeniedPanel onBack={() => this.authUser()} id="denied" />
        <ProfilePanel
          profile={this.state.profile}
          onBack={() => this.setState({ currentPanel: "main" })}
          id="profile"
        />
      </View>
    );
  }
  authUser() {
    this.setState({ currentPanel: "main" });
    vkConnect
      .sendPromise("VKWebAppGetAuthToken", { app_id, scope: "friends" })
      .then(r => {
        this.setState({ token: r.access_token });
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
          .filter(
            r =>
              !r.blacklisted_by_me &&
              !r.blacklisted &&
              r.can_send_friend_request &&
              r.can_write_private_message &&
              (!!r.last_seen
                ? Date.now() / 1000 - r.last_seen.time < 3600 * 24
                : true) &&
              !r.is_closed
          )
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
      status: 6,
      has_photo: 1,
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
