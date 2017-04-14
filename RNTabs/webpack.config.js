module.exports = {
  /* 入口文件 即 需要被打包的文件在此配置 */
  entry: "./index.js",

  /* 打包后要输出的文件 */
  output: {
    filename:"bundle.js",
    publicPath:''
  },

  /* 配置一些解析器 */
  module: {
      loaders: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader?presets[]=es2015&presets[]=react'
        }
      ]
    }

}
