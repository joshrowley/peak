var jade = require('jade');

var Jade = {

  kind: 'html',
  extension: 'jade',

  compile: function (options, resolve, reject) {
    var opts = {};
    opts.pretty = true;
    opts.filename = options.path;
    resolve(jade.render(options.source, opts));
  }

}

module.exports = Jade;
