// you can use this file to add your custom webpack plugins, loaders and anything you like.
// This is just the basic way to add addional webpack configurations.
// For more information refer the docs: https://goo.gl/qPbSyX

// IMPORTANT
// When you add this file, we won't add the default configurations which is similar
// to "React Create App". This only has babel loader to load JavaScript.
const base = require('../../../.storybook/webpack.config');
const extra = require('../webpack-plugins');

module.exports = function({ config }) {
    const newConfig = base({ config });
    newConfig.plugins = newConfig.plugins.concat(extra.plugins);
    return newConfig;
}

// WARNING in unable to locate 'node_modules/brace/snippets' at '/Users/jmfrancois/github/talend/ui/packages/forms/node_modules/brace/snippets'

