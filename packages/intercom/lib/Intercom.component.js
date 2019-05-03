"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Intercom;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _service = _interopRequireDefault(require("./service"));

require("./Intercom.scss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function Intercom(_ref) {
  var id = _ref.id,
      config = _ref.config;
  (0, _react.useEffect)(function () {
    _service.default.boot(id, config);

    return _service.default.shutdown();
  }, [config]);
  return _react.default.createElement("button", {
    id: id,
    className: "talend-intercom"
  }, _react.default.createElement("svg", {
    width: "2.4rem",
    height: "2.4rem",
    id: "bubbles"
  }, _react.default.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 16 16"
  }, _react.default.createElement("path", {
    d: "M4 0v8h6l4 4V8h2V0z"
  }), _react.default.createElement("path", {
    d: "M3 9V3H0v9h2v4l4-4h4V9z"
  }))));
}

Intercom.propTypes = {
  id: _propTypes.default.string.isRequired,
  config: _propTypes.default.shape({
    app_id: _propTypes.default.string.isRequired,
    name: _propTypes.default.string,
    email: _propTypes.default.string,
    company_name: _propTypes.default.string
  }).isRequired
};