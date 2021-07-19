module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  chainWebpack: config => {
    const rule = config.module.rule('media')
    rule.store.set('test', /\.(mp4|webm|ogg|mp3|wav|flac|aac|mov)(\?.*)?$/)
  }

}
