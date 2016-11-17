require('malta').checkDeps('uglifycss');

var uglify_css = require("uglifycss"),
	path = require('path'),
	fs = require('fs');
	
function malta_css_uglify(o, options) {

	var self = this,
		start = new Date(),
		msg = "",
		pluginName = path.basename(path.dirname(__filename)),
		doErr = function (e) {
			console.log(('[ERROR on ' + o.name + ' using ' + pluginName + '] :').red());
			console.dir(e);
			self.stop();
		};

	options = options || {};
	options.maxLineLen = options.maxLineLen || 500;
	options.expandVars = options.expandVars || true;
	options.uglyComments = options.uglyComments || false;
	options.cuteComments = options.cuteComments || true;
	try{
		o.content = uglify_css.processString(o.content, options);
	} catch(err) {
		doErr(err);
	}

	return function (solve, reject){
		fs.writeFile(o.name, o.content, function(err) {
			err && doErr(err);
			msg = 'plugin ' + pluginName.white() + ' wrote ' + o.name + ' (' + self.getSize(o.name) + ')';
			solve(o);
			self.notifyAndUnlock(start, msg);
		});	
	};
}
malta_css_uglify.ext = ['css', 'less', 'scss'];
module.exports = malta_css_uglify;