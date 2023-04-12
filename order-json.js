const fs = require('fs');

const content = fs.readFileSync(process.argv[2], 'utf8');
const json = JSON.parse(content);
const keys = Object.keys(json);
const sortedKeys = keys.sort();
const sortedJson = {};
sortedKeys.forEach(key => {
	sortedJson[key] = json[key];
});
fs.writeFileSync(process.argv[2], JSON.stringify(sortedJson, null, 2));
