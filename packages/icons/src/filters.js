//generate the react.js file
const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, './filters');

//read svg
const files = fs.readdirSync(dir);
const filters = {};
//case insensitive sort for windows users
files
	.sort(function(a, b) {
		return a.localeCompare(b, { sensitivity: 'base' });
	})
	.forEach(file => {
		filters[file.split('.svg')[0]] = fs.readFileSync(path.resolve(dir, file));
	});
exports.default = filters;
