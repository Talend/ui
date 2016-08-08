/* eslint no-underscore-dangle: ["error", {"allow": ["_registry", "_isLocked"] }]*/
const Registry = {
  _registry: {},
  _isLocked: false,
  getRegistry() {
    return this._registry;
  },
  lock() {
    this._isLocked = true;
  },
  isLocked() {
    return this._isLocked;
  },
};

function addToRegistry(id, item) {
  const r = Registry.getRegistry();
  if (!r.isLocked) {
    r[id] = item;
  }
  // Should it do nothing ?
}
function getRegistry() {
  return Registry.getRegistry();
}
function getFromRegistry(id) {
  return getRegistry()[id];
}

export default {
  Registry,
  addToRegistry,
  getRegistry,
  getFromRegistry,
};
