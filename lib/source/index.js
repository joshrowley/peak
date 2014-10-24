var Coffee = require('./adapters/coffee')
  , Haml = require('./adapters/haml')
  , Jade = require('./adapters/jade')
  , Stylus = require('./adapters/stylus')

  , fs = require('fs')
  , when = require('when')


var Adapters = {
  coffee: Coffee,
  haml: Haml,
  jade: Jade,
  stylus: Stylus
}

var Source = function (options) {
  this.options = options || {};
  if (this.options.with) {
    this.adapter = Adapters[this.options.with];
  } else if (this.options.filename) {
    for (key in Adapters) {
      adapter = Adapters[key];
      if (adapter.extension == path.extname(options.path).slice(1)) {
        this.adapter = adapter;
      }
    }
  }
}

Source.prototype = {

  compile: function () {
    if (this.adapter) {
      return this.get_source()
        .then(this.before_compile_hook)
        .then(this.compile_hook)
        .then(this.after_compile_hook);
    } else {
      return when.reject();
    }
  },

  get_source: function () {
    var __this = this;
    return when.promise(function(resolve, reject){
      if (__this.options.filename) {
        fs.readFile(__this.options.filename, function (err, source) {
          if (error) reject(error);
          __this.options.source = source;
        });
      }
      if (__this.options.source) {
        resolve();
      } else {
        reject();
      }
    })
  },

  before_compile_hook: function (source) {
    var __this = this;
    return when.promise(function(resolve, reject) {
      if (__this.adapter.before_compile) {
        __this.adapter.before_compile(__this.options, resolve, reject);
      } else {
        resolve(source);
      }
    });
  },

  compile_hook: function (source) {
    var __this = this;
    return when.promise(function(resolve, reject) {
      __this.adapter.compile(__this.options, resolve, reject);
    });
  },

  after_compile_hook: function (source) {
    var __this = this;
    return when.promise(function(resolve, reject){
      if (__this.adapter.after_compile) {
        __this.adapter.after_compile(__this.options, resolve, reject);
      } else {
        resolve(source);
      }
    });
  }

}

module.exports = Source;
