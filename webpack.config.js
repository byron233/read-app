const path = require('path');

module.exports = {
    entry: {
        appGame: './public/js/gamePage.js',
        appMain: './public/js/main.js'
    },
    output: {
        path: path.join(__dirname, '/public/dist'),
        filename: '[name].js'
    }
};