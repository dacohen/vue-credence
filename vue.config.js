module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? '/vue-credence/' : '/',
    chainWebpack: config => {
        config.plugin('html').tap(args => {
            args[0].title = 'Credence'
            return args
        })
    }
}