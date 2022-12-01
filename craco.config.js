const path = require('path');
const CracoCSSModules = require('craco-css-modules');
const CracoLessPlugin = require('craco-less');

const resolve = (dir) => path.resolve(__dirname, dir);

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
  webpack: {
    alias: {
      '@': resolve('src'),
      components: resolve('src/components'),
    },
    configure: (webpackConfig, { env, paths }) => {
      // 配置扩展扩展名
      webpackConfig.resolve.extensions = [
        ...webpackConfig.resolve.extensions,
        ...['.js', '.jsx', '.ts', '.tsx', '.json'],
      ];
      return webpackConfig;
    },
  },
};
