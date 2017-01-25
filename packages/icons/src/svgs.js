//generate the react.js file
const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, './svg');

//read svg
const files = fs.readdirSync(dir);
const svgs = {};
files.forEach((file) => {
	svgs[file.split('.svg')[0]] = fs.readFileSync(path.resolve(dir, file));
});
exports.default = svgs;
