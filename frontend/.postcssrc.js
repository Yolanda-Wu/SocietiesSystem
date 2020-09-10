module.exports = {
  sourceMap: false,
  parser: 'postcss-scss', // scss行内注释
  plugins: {
    autoprefixer: {}, // 自动管理浏览器前缀
    cssnano: {}
  }
};
