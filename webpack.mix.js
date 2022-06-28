const mix = require('laravel-mix');
const fs = require('fs');

const rootPath = process.env.PWD;
const resourcesPath = rootPath + '/resources';
//const publicPath = 'public';
const extensionPath = 'chrome-extension/PasswordApp';

mix.alias({
	'@app': resourcesPath + '/js/app/',
	'@support': resourcesPath + '/js/support/',
	'@core': resourcesPath + '/js/core/',
	'@ui': resourcesPath + '/js/core/ui/',
});

mix.options({
	terser: {
		extractComments: false,
	}
});

const getFiles = function (dir, path = '') {
	const readPath = dir + path;
	let files = [];
	fs.readdirSync(readPath)
		.forEach(entry => {
			const stat = fs.statSync(readPath + '/' + entry);
			if (stat.isFile()) {
				if (entry.charAt(0) === '_')
					return;
				files.push(path + '/' + entry);
				return files;
			} else if (stat.isDirectory()) {
				getFiles(dir, path + '/' + entry).forEach(f => files.push(f));
			}
		});
	return files;
};

const mixPath = function (resourcesPath, publicPath, mixMethod) {
	getFiles(resourcesPath + '/page').forEach(function (entry) {
		const entryPath = (function () {
			let a = entry.split('/');
			a.pop();
			return a.length ? '/' + a.join('/') : '';
		})();

		mix[mixMethod](resourcesPath + '/page' + entry, publicPath + '' + entryPath);
	});
};

//mixPath('resources/js', 'public/js', 'js');
//mixPath('resources/sass', 'public/css', 'sass');

mixPath('resources/js', extensionPath + '/js', 'js');
mixPath('resources/sass', extensionPath + '/css', 'sass');

mix.js('resources/js/sw/sw.js', extensionPath);
mix.js('resources/js/content/content.js', extensionPath);
mix.js('resources/js/background/background.js', extensionPath);
