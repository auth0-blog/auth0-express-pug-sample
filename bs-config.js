module.exports = {
  proxy: "localhost:4041",
  files: ["**/*.css", "**/*.pug", "**/*.js"],
  ignore: ["node_modules"],
  reloadDelay: 300,
  ui: false,
  notify: false,
  port: 4040,
};
