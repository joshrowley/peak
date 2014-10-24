var coffee = require('coffee-script');

var Coffee = {

  kind: 'js',
  extension: 'coffee',

  compile: function (options, resolve, reject) {
    resolve(coffee.compile(options.source));
  }

}

module.exports = Haml;
