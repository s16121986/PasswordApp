const mix = require('laravel-mix');
const fs = require('fs');

const rootPath = process.env.PWD;
const resourcesPath = rootPath + '/resources';
//const publicPath = 'public';
const extensionPath = 'chrome-extension/PasswordApp';

mix.alias({
	'@dashboard': resourcesPath + '/dashboard/js/',
	'@core': resourcesPath + '/dashboard/js/core/',
	'@ui': resourcesPath + '/dashboard/js/core/ui/',

	'~dashboard': resourcesPath + '/dashboard/sass',
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

mixPath('resources/dashboard/js', 'public/js', 'js');
mixPath('resources/dashboard/sass', 'public/css', 'sass');

mixPath('resources/chrome-extension/js', extensionPath + '/js', 'js');
mixPath('resources/chrome-extension/sass', extensionPath + '/css', 'sass');

const x = mix.js('resources/chrome-extension/js/background.js', extensionPath);
