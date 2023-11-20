/* eslint-disable no-param-reassign */
import fs from 'fs';

import * as utils from '@talend/scripts-utils';

const reports = ['eslint-report.json', 'stylelint-report.json'];

const packageDirs = ['packages', 'fork', 'tools'];

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
	return item;
}

function getPackages() {
	return packageDirs.flatMap(dir =>
		fs.readdirSync(dir).map(subDir => ({
			name: subDir,
			location: `${dir}/${subDir}`,
		})),
	);
}

export default function mergeReport(env, presetApi, options) {
	const packages = getPackages();
	// https://stackoverflow.com/questions/65944700/how-to-run-git-diff-in-github-actions
	const diff = utils.process
		.spawn('git', ['diff', '--name-only', `origin/${options[0]}`, `origin/${options[1]}`], {
			stdio: 'inherit',
			env,
		})
		.then(out =>
			out
				.split('\n')
				.map(str => str.trim())
				.filter(Boolean),
		)
		.catch(e => console.error(e));

	diff.then(files => {
		function onlyIfInDiff(lint) {
			return !!files.find(f => lint.filePath.endsWith(`/${f}`));
		}

		packages.forEach(pkg => {
			reports.forEach(report => {
				const fpath = `${pkg.location}/${report}`;
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
}
