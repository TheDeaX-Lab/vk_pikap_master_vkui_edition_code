import React from "react";
import { Component } from "react";
import MainPanel from "./Panels/MainPanel";
import SettingsPanel from "./Panels/SettingsPanel";
import ProfilePanel from "./Panels/ProfilePanel";
import AccessDeniedPanel from "./Panels/AccessDeniedPanel";
import AboutPanel from "./Panels/AboutPanel";
import {
  View,
  ScreenSpinner,
  Epic,
  Tabbar,
  TabbarItem,
  Alert
} from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";
import vkConnect from "@vkontakte/vk-connect";
import { isUndefined } from "util";
import SearchIcon from "@vkontakte/icons/dist/24/search";
import InfoIcon from "@vkontakte/icons/dist/24/info";
import version from "./version.txt";
import image from "./VcH4TT4bFkw.png";
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
      filteredUsers: [],
      profile: {},
      popout: ""
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
  onFromYearUpdate(from_year) {
    this.setState({ from_year });
  }
  onToYearUpdate(to_year) {
    this.setState({ to_year });
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
  onBlacklistedNeededUpdate(blacklisted_needed) {
    this.setState({ blacklisted_needed });
  }
  onBlacklistedByMeNeededUpdate(blacklisted_by_me_needed) {
    this.setState({ blacklisted_by_me_needed });
  }
  onCanWritePrivateMessageNeededUpdate(can_write_private_message_needed) {
    this.setState({ can_write_private_message_needed });
  }
  onCanSendFriendRequestNeededUpdate(can_send_friend_request_needed) {
    this.setState({ can_send_friend_request_needed });
  }
  onIsClosedNeededUpdate(is_closed_needed) {
    this.setState({ is_closed_needed });
  }
  onDateNeededUpdate(dateNeeded) {
    this.setState({ dateNeeded });
  }
  onBlacklistedUpdate(blacklisted) {
    this.setState({ blacklisted });
  }
  onBlacklistedByMeUpdate(blacklisted_by_me) {
    this.setState({ blacklisted_by_me });
  }
  onCanWritePrivateMessageUpdate(can_write_private_message) {
    this.setState({ can_write_private_message });
  }
  onCanSendFriendRequestUpdate(can_send_friend_request) {
    this.setState({ can_send_friend_request });
  }
  onIsClosedUpdate(is_closed) {
    this.setState({ is_closed });
  }
  onClear() {
    this.setState({ filteredUsers: [] });
  }
  toAbout() {
    if (this.state.currentPanel !== "about") {
      this.setState({
        currentView: "about_view",
        currentPanel: "about",
        transition: true
      });
    }
  }
  toMain() {
    if (this.state.currentPanel !== "main") {
      this.setState({
        currentView: "main_view",
        currentPanel: "main"
      });
    }
  }
  toSettings() {
    if (this.state.currentPanel !== "settings") {
      this.setState({ currentPanel: "settings", currentView: "main_view" });
    }
  }
  toProfile(r) {
    if (this.state.currentPanel !== "settings") {
      this.setState({
        currentView: "main_view",
        profile: r,
        currentPanel: "profile"
      });
    }
  }

  render() {
    return (
      <Epic
        activeStory={this.state.currentView}
        tabbar={
          !this.state.is_loading &&
          this.state.currentPanel !== "profile" &&
          this.state.token && (
            <Tabbar>
              <TabbarItem
                onClick={() => this.toMain()}
                selected={this.state.currentView === "main_view"}
                data-story="main_view"
                text="Поиск"
              >
                <SearchIcon />
              </TabbarItem>
              <TabbarItem
                onClick={() => this.toAbout()}
                selected={this.state.currentView === "about_view"}
                data-story="about_view"
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
          popout={
            (this.state.is_loading && <ScreenSpinner />) || this.state.popout
          }
          id="main_view"
        >
          <SettingsPanel
            {...this.state}
            onCityUpdate={r => this.onCityUpdate(r)}
            onCountryUpdate={r => this.onCountryUpdate(r)}
            onFromYearUpdate={r => this.onFromYearUpdate(r)}
            onToYearUpdate={r => this.onToYearUpdate(r)}
            onSexUpdate={r => this.onSexUpdate(r)}
            onStatusUpdate={r => this.onStatusUpdate(r)}
            onQUpdate={r => this.onQUpdate(r)}
            onHasPhotoUpdate={r => this.onHasPhotoUpdate(r)}
            onRangeDateUpdate={r => this.onRangeDateUpdate(r)}
            onBlacklistedByMeUpdate={r => this.onBlacklistedByMeUpdate(r)}
            onBlacklistedUpdate={r => this.onBlacklistedUpdate(r)}
            onCanSendFriendRequestUpdate={r =>
              this.onCanSendFriendRequestUpdate(r)
            }
            onCanWritePrivateMessageUpdate={r =>
              this.onCanWritePrivateMessageUpdate(r)
            }
            onIsClosedUpdate={r => this.onIsClosedUpdate(r)}
            onDateNeededUpdate={r => this.onDateNeededUpdate(r)}
            onBlacklistedByMeNeededUpdate={r =>
              this.onBlacklistedByMeNeededUpdate(r)
            }
            onBlacklistedNeededUpdate={r => this.onBlacklistedNeededUpdate(r)}
            onCanSendFriendRequestNeededUpdate={r =>
              this.onCanSendFriendRequestNeededUpdate(r)
            }
            onCanWritePrivateMessageNeededUpdate={r =>
              this.onCanWritePrivateMessageNeededUpdate(r)
            }
            onIsClosedNeededUpdate={r => this.onIsClosedNeededUpdate(r)}
            onBack={() => this.toMain()}
            id="settings"
          />
          <MainPanel
            {...this.state}
            toSettings={() => this.toSettings()}
            onProfile={r => this.toProfile(r)}
            onSearch={() => this.searchUsers()}
            onClear={() => this.onClear()}
            onSettings={() => this.toSettings()}
            publicationStory={() => this.publicationStory()}
            id="main"
          />

          <AccessDeniedPanel onBack={() => this.authUser()} id="denied" />
          <ProfilePanel
            profile={this.state.profile}
            onBack={() => this.toMain()}
            id="profile"
          />
        </View>
        <View id="about_view" activePanel={this.state.currentPanel}>
          <AboutPanel id="about" />
        </View>
      </Epic>
    );
  }
  componentDidMount() {
    setInterval(() => this.updateHandler(), 30000);
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
            let arr = [
              !!this.state.blacklisted_by_me_needed
                ? r.blacklisted_by_me === this.state.blacklisted_by_me
                : true,
              !!this.state.blacklisted_needed
                ? r.blacklisted === this.state.blacklisted
                : true,
              !!this.state.can_send_friend_request_needed
                ? r.can_send_friend_request ===
                  this.state.can_send_friend_request
                : true,
              !!this.state.can_write_private_message_needed
                ? r.can_write_private_message ===
                  this.state.can_write_private_message
                : true,
              !isUndefined(r.last_seen) && !!this.state.dateNeeded
                ? this.state.rangeDate[0] <=
                    Date.now() / 1000 - r.last_seen.time &&
                  Date.now() / 1000 - r.last_seen.time <=
                    this.state.rangeDate[1]
                : true,
              !!this.state.is_closed_needed && !isUndefined(r.is_closed)
                ? (r.is_closed ? 1 : 0) === this.state.is_closed
                : true
            ];
            return !(arr.indexOf(false) > -1);
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
            try {
              r.secondsBefore = Date.now() / 1000 - r.last_seen.time;
              r.timesBefore = [
                Math.floor(r.secondsBefore % 60),
                Math.floor(r.secondsBefore / 60) % 60,
                Math.floor(r.secondsBefore / 3600) % 24,
                Math.floor(r.secondsBefore / 86400)
              ];
            } catch {
              r.timesBefore = false;
            }
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
        "last_seen,can_write_private_message,can_send_friend_request,blacklisted_by_me,blacklisted,photo_200,bdate,sex,is_closed",
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
  executeVkApi(method, params, repeat = true) {
    return vkConnect
      .sendPromise("VKWebAppCallAPIMethod", {
        method,
        params: { ...params, v, access_token: this.state.token }
      })
      .catch(() => (repeat ? this.executeVkApi(method, params) : {}));
  }
  updateHandler() {
    fetch(version)
      .then(r => r.text())
      .catch(() => alert("Приложение устарело, очистите кеш!"));
  }

  publicationStory() {
    this.setState({ is_loading: true });
    this.executeVkApi("stories.getPhotoUploadServer", {
      link_text: "go_to",
      link_url: "https://vk.com/app7185084",
      add_to_news: 1
    }).then(r => {
      fetch(image)
        .then(t => t.blob())
        .then(t => {
          var data = new FormData();
          data.append("file", t, "story.png");
          fetch(
            `https://cors-anywhere.herokuapp.com/${r.response.upload_url}`,
            {
              method: "POST",
              body: data
            }
          )
            .then(r => r.json())
            .then(() => {
              this.setState({ is_loading: false });
              this.openDestructive();
            });
        });
    });
  }
  closePopout() {
    this.setState({ popout: null });
  }
  openDestructive() {
    this.setState({
      popout: (
        <Alert
          actionsLayout="vertical"
          actions={[
            {
              title: "Не за что",
              autoclose: true,
              style: "cancel"
            }
          ]}
          onClose={() => this.closePopout()}
        >
          <h2>Сообщение сервиса</h2>
          <p>
            Спасибо за то, что вы вносите хоть какой то вклад в наш сервис.
            <br />
            Разработчики вас не забудут и будут помнить.
          </p>
        </Alert>
      )
    });
  }
  authUser() {
    this.setState({ currentPanel: "main", is_loading: true });
    vkConnect
      .sendPromise("VKWebAppGetAuthToken", {
        app_id,
        scope: "friends,stories"
      })
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
          this.onSexUpdate(!!r.sex ? (r.sex === 1 ? 2 : 1) : 0);
          this.setState({ current_id: r.id });
        });
      })
      .catch(() =>
        this.setState({ currentPanel: "denied", is_loading: false })
      );
  }
}

export default App;
