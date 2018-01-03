//generate the react.js file
const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, './svg');

//read svg
const files = fs.readdirSync(dir);
const svgs = {};
//case insensitive sort for windows users
files.sort(function (a, b) {
	return a.localeCompare(b, {'sensitivity': 'base'});
}).forEach((file) => {
	svgs[file.split('.svg')[0]] = fs.readFileSync(path.resolve(dir, file));
});
exports.default = svgs;
