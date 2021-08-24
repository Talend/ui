/* eslint-disable no-param-reassign */
const fs = require('fs');

const ROOT = './packages';
const reports = ['eslint-report.json', 'stylelint-report.json'];
const pkgs = fs.readdirSync(ROOT);

let buff = [];
let files = [];

// gather diff from trilom/file-changes-action
const diffPath = `${process.env.HOME}/files.json`;

if (fs.existsSync(diffPath)) {
	// eslint-disable-next-line no-console
	console.log('found diff files');
	files = JSON.parse(fs.readFileSync(diffPath).toString());
	// eslint-disable-next-line no-console
	console.log(files);
}

function onlyIfInDiff(lint) {
	return !!files.find(f => lint.filePath.endsWith(`/${f}`));
}

function transform(item) {
	if (item.source && !item.filePath) {
		item.filePath = item.source;
		delete item.source;
	}
	if (item.warnings && !item.messages) {
		item.messages = item.warnings.map(w => ({
			...w,
			severity: 1,
			message: w.text,
			ruleId: w.rule,
		}));
		item.warningCount = item.warnings.length;
		delete item.warning;
	} else if (item.messages) {
		item.messages = item.messages.map(w => ({ ...w, severity: 1 }));
		item.warningCount += item.errorCount;
		item.errorCount = 0;
	}
	return item;
}

pkgs.forEach(pkg => {
	reports.forEach(report => {
		const fpath = `${ROOT}/${pkg}/${report}`;
		if (fs.existsSync(fpath)) {
			try {
				buff = buff.concat(JSON.parse(fs.readFileSync(fpath)).map(transform).filter(onlyIfInDiff));
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
