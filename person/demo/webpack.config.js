const path = require('path')

const config = {
    entry:{
        main: './src/index.js',
        other: './src/2.js'
    },
    output:{
        filename:'[name].js',
        path: path.resolve(__dirname,'./dist')
    }
}

module.exports = config
