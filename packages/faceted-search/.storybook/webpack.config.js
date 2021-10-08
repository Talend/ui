const SASS_DATA = "@import '~@talend/bootstrap-theme/src/theme/guidelines';";

const autoprefixer = require.main.require("autoprefixer");
const autoPrefixerPlugin = autoprefixer({ browsers: ["last 2 versions"] });

const commonConfiguration = (storybookBaseConfig) => {
  storybookBaseConfig.module.rules.push(
    {
      test: /\.woff(2)?(\?[a-z0-9=&.]+)?$/,
      loader: "url-loader",
      options: {
        limit: 50000,
        mimetype: "application/font-woff",
        name: "./fonts/[name].[ext]",
      },
    },
    {
      test: /theme.scss$/,
      use: [
        "style-loader",
        "css-loader",
        {
          loader: "postcss-loader",
          options: {
            plugins: [autoPrefixerPlugin],
          },
        },
        {
          loader: "sass-loader",
          options: {
            prependData: SASS_DATA,
          },
        },
      ],
    },
    {
      test: /\.scss$/,
      exclude: /theme.scss/,
      use: [
        "style-loader",
        {
          loader: "css-loader",
          options: {
            sourceMap: true,
            importLoaders: 1,
            modules: {
              localIdentName: "[name]__[local]___[hash:base64:5]",
            },
          },
        },
        {
          loader: "postcss-loader",
          options: {
            plugins: [autoPrefixerPlugin],
          },
        },
        {
          loader: "sass-loader",
          options: {
            prependData: SASS_DATA,
          },
        },
      ],
    },
    {
      test: /\.css$/,
      use: [
        "style-loader",
        "css-loader",
        {
          loader: "postcss-loader",
          options: {
            plugins: [autoPrefixerPlugin],
          },
        },
      ],
    }
  );

  return storybookBaseConfig;
};

module.exports = ({ config }) => {
  const storybookConfig = commonConfiguration(config);

  storybookConfig.module.rules = storybookConfig.module.rules.filter(
    (rule) => rule.test.toString() !== "/\\.css$/"
  );

  storybookConfig.module.rules.push({
    test: /\.js?$/,
    include: /node_modules/,
    loader: "babel-loader",
  });

  storybookConfig.module.rules.push({
    test: /\.css$/,
    use: [
      "style-loader",
      "css-loader",
      {
        loader: "postcss-loader",
        options: {
          plugins: [autoPrefixerPlugin],
        },
      },
    ],
  });

  return storybookConfig;
};
