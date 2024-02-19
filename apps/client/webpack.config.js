const { composePlugins, withNx } = require('@nx/webpack');
const { withReact } = require('@nx/react');
const webpack = require('webpack');

module.exports = composePlugins(withNx(), withReact(), (config) => {
  config.plugins.push(
    new webpack.DefinePlugin({
      'process.env.SERVER_API_URL': JSON.stringify(process.env.SERVER_API_URL),
    })
  );

  return config;
});
