
module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/productConfiguratorApp/'
    : '/',
  configureWebpack: {
    // Add resolve aliases if needed
    resolve: {
      alias: {
        '@': require('path').resolve(__dirname, 'src')
      }
    }
  }
}
