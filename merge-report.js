/* eslint-disable no-param-reassign */
const fs = require('fs');
const run = require('./run');

const reports = ['eslint-report.json', 'stylelint-report.json'];

let buff = [];

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
	// eslint-disable-next-line no-console
	console.log({ item });
	return item;
}
const info = run({ name: 'yarn', args: ['workspaces', '--silent', 'info'] }).then(info =>
	JSON.parse(info),
);

const diff = run({ name: 'git', args: ['diff', '--name-only'] }).then(out =>
	out.split('\n').map(str => str.trim()),
);

Promise.all([info, diff]).then(results => {
	const [infos, files] = results;
	// eslint-disable-next-line no-console
	console.log({ files });
	function onlyIfInDiff(lint) {
		return !!files.find(f => lint.filePath.endsWith(`/${f}`));
	}
	Object.keys(infos).forEach(pkg => {
		reports.forEach(report => {
			const fpath = `${infos[pkg].location}/${report}`;
			if (fs.existsSync(fpath)) {
				try {
					buff = buff.concat(
						JSON.parse(fs.readFileSync(fpath)).map(transform).filter(onlyIfInDiff),
					);
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
});
