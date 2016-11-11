require('malta').checkDeps('uglifycss');

var uglify_css = require("uglifycss"),
	path = require('path'),
	fs = require('fs');
	
function malta_css_uglify(o, options) {

	var self = this,
		start = new Date(),
		msg;

	options = options || {};
	options.maxLineLen = options.maxLineLen || 500;
	options.expandVars = options.expandVars || true;
	options.uglyComments = options.uglyComments || false;
	options.cuteComments = options.cuteComments || true;

	o.content = uglify_css.processString(o.content, options);

	return function (solve, reject){
		fs.writeFile(o.name, o.content, function(err) {
			if (err == null) {
				msg = 'plugin ' + path.basename(__filename) + ' wrote ' + o.name + ' (' + self.getSize(o.name) + ')';
			} else {
				console.log('[ERROR] uglifycss says:');
				console.dir(err);
				self.stop();
			}
			solve(o);
			self.notifyAndUnlock(start, msg);
		});	
	};
}
malta_css_uglify.ext = ['css', 'less', 'scss'];
module.exports = malta_css_uglify;