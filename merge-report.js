const fs = require('fs');
const EOL = require('os').EOL;

const ROOT = './packages';
const reports = ['eslint-report.json', 'stylelint-report.json'];
const pkgs = fs.readdirSync(ROOT);

let buff = [];
let files = [];

const diffPath = `${process.cwd()}/master.diff.log`;
if (fs.existsSync(diffPath)) {
	// eslint-disable-next-line no-console
	console.log('found diff files');
	files = fs.readFileSync(diffPath).toString().split(EOL);
}
function onlyIfInDiff(lint) {
    return !!files.find(f => lint.filePath.endsWith(`/${f}`))
}

pkgs.forEach(pkg => {
	reports.forEach(report => {
		const fpath = `${ROOT}/${pkg}/${report}`;
		if (fs.existsSync(fpath)) {
			try {
				buff = buff.concat(JSON.parse(fs.readFileSync(fpath)).filter(onlyIfInDiff));
			} catch (e) {
				console.error(e);
			}
		}
	});
});
const target = `${process.cwd()}/eslint-report.json`;

// eslint-disable-next-line no-console
console.log(`report merge into ${target}`);
fs.writeFileSync(target, JSON.stringify(buff, null, 2));
