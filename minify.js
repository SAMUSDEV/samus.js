var compressor = require('node-minify');

new compressor.minify({
    type: 'yui-js',
    fileIn: 'bin/samus.js',
    fileOut: 'bin/samus.min.js',
    callback: function(err, min){
      console.log(err);
      //console.log(min);
    }
});