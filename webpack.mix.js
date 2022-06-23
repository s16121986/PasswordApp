const mix = require('laravel-mix');
const fs = require('fs');

const rootPath = process.env.PWD;
const resourcesPath = rootPath + '/resources';

mix.alias({
	'@core': resourcesPath + '/js/core/',
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

mixPath('resources/sass', 'public/css', 'sass');
mixPath('resources/js', 'public/js', 'js');
