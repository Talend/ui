"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* eslint-disable prefer-rest-params */
var intercom;

function insertScript(appId) {
  var s = document.createElement('script');
  s.type = 'text/javascript';
  s.async = true;
  s.src = "https://widget.intercom.io/widget/".concat(appId);
  var x = document.getElementsByTagName('script')[0];
  x.parentNode.insertBefore(s, x);
}

function init(config) {
  if (typeof intercom === 'function') {
    intercom('reattach_activator');
    intercom('update', config);
  } else {
    intercom = function ic() {
      intercom.c(arguments);
    };

    intercom.q = [];

    intercom.c = function (args) {
      intercom.q.push(args);
    };

    window.Intercom = intercom;

    if (window.attachEvent) {
      window.attachEvent('onload', insertScript.bind(config.app_id));
    } else {
      window.addEventListener('load', insertScript.bind(config.app_id), false);
    }
  }
}

function boot(widgetId) {
  var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  init(config);
  intercom('boot', _objectSpread({}, config, {
    widget: {
      activator: widgetId
    },
    hide_default_launcher: true
  }));
}

function update(config) {
  intercom('update', config);
}

function shutdown() {
  intercom('shutdown');
}

function onHide() {
  intercom('onHide');
}

function onShow() {
  intercom('onShow');
}

function onUnreadCountChange() {
  intercom('onUnreadCountChange');
}

var _default = {
  init: init,
  boot: boot,
  update: update,
  shutdown: shutdown,
  onHide: onHide,
  onShow: onShow,
  onUnreadCountChange: onUnreadCountChange
};
exports.default = _default;