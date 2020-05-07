const path = require("path");

module.exports = {
  transpileDependencies: [
    "vuetify"
  ],

  outputDir: path.resolve(__dirname, "dist"),
  assetsDir: process.env.NODE_ENV === "development" ? "" : "../assets",

  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:8081"
      }
    }
  }
};
