module.exports = {
    entry:[
        './jsx/index.jsx'
    ],
    output: {
        path: __dirname + '/js/',
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            { test: /\.jsx?$/, loaders: ['jsx?harmony']}
        ]
    }
};