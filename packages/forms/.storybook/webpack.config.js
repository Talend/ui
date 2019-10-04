const base = require('../../../.storybook/webpack.config');
const extra = require('../webpack');

module.exports = function({ config }) {
    const newConfig = base({ config });
    newConfig.plugins = newConfig.plugins.concat(extra.plugins);
    return newConfig;
}

