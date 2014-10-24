var haml = require('haml');

var Haml = {

  kind: 'html',
  extension: 'haml',

  compile: function (options, resolve, reject) {
    var opts = {};
    opts.filename = options.path;
    resolve(haml.render(options.source, opts));
  }

}

module.exports = Haml;
