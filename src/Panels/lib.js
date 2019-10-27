import vkConnect from "@vkontakte/vk-connect";
var methods = {
  executeVkApi(method, params, access_token, v = "5.102") {
    return vkConnect
      .sendPromise("VKWebAppCallAPIMethod", {
        method,
        params: { ...params, v, access_token }
      })
      .catch(() => this.executeVkApi(method, params, access_token, v));
  }
};
export default methods;
