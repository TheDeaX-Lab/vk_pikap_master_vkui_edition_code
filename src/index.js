import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-vuex";
import store from "./store";
import vkConnect from "@vkontakte/vk-connect";

vkConnect.subscribe(r => {
  if (r.detail.type === "VKWebAppUpdateConfig") {
    document.body.setAttribute("scheme", r.detail.data.scheme);
  }
  //console.log(r.detail);
});
vkConnect.send("VKWebAppInit", {});
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
