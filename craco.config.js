// Extend webpack configuration

const path = require("path");
const { whenProd, getPlugin, pluginByName } = require("@craco/craco");

module.exports = {
  // webpack Configuration
  webpack: {
    // Configure alias
    alias: {
      // 约定：使用 @ 表示 src 文件所在路径
      "@": path.resolve(__dirname, "src"),
    },
    // Configure CDN below
    configure: (webpackConfig) => {
      let cdn = {
        js: [],
      };
      whenProd(() => {
        webpackConfig.externals = {
          // key: 不参与打包的包（由dependencies依赖项中的key决定）
          // value: cdn文件中挂载于全局的变量名称（为了替换之前在开发环境下）
          react: "React",
          "react-dom": "ReactDOM",
        };
        // Configure existing CDN source url here
        // Fact: Companies need to rent their own CDN servers to do this during industry development
        cdn = {
          js: [
            "https://cdnjs.cloudflare.com/ajax/libs/react/18.1.0/umd/react.production.min.js",
            "https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.1.0/umd/react-dom.production.min.js",
          ],
        };
      });

      // Inject CDN url into public/index.html via htmlWebpackPlugin plugin
      const { isFound, match } = getPlugin(
        webpackConfig,
        pluginByName("HtmlWebpackPlugin")
      );

      console.log(match); // a HtmlWebpackPlugin object

      if (isFound) {
        // If HtmlWebpackPlugin plugin is found
        match.options.files = cdn;
      }

      return webpackConfig;
    },
  },
};
