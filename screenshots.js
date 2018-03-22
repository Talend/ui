const program = require('commander');
const fs = require('fs');
const tmp = require('tmp-promise');
const PNG = require('pngjs').PNG;
const pixelmatch = require('pixelmatch');
const puppeteer = require('puppeteer');

const config = require('./screenshots.json');

program
	.option('-p, --pullrequest [pr]', 'Pull request')
	.option('-v, --verbose', 'Verbose')
	.parse(process.argv);

const PR = program.pullrequest;
if (!PR) {
	console.error('you must precise a PR number using -p or --pullrequest');
	process.exit();
}

function log(msg) {
	if (program.verbose) {
		console.log(msg);
	}
}

async function asyncForEach(array, callback) {
	for (let index = 0; index < array.length; index += 1) {
		await callback(array[index], index, array);
	}
}

const TMP_CONFIG = { postfix: '.png' };

async function compare(masterPage, branchPage, path = 'theme') {
	const themeConfig = config[path];
	log(`\nCompare ${path}`);
	log('Go to master page');
	await masterPage.goto(`http://talend.surge.sh/${path}`);
	log('-- ok');
	log('Go to PR page');
	await branchPage.goto(`http://${PR}.talend.surge.sh/${path}`);
	log('-- ok');

	await asyncForEach(themeConfig, async pageConfig => {
		log(`Process ${pageConfig}`);
		let masterScreenShot;
		const masterElement = await masterPage.$(`${pageConfig.selector}`);
		if (masterElement) {
			masterScreenShot = await tmp.file(TMP_CONFIG);
			await masterElement.screenshot({ path: masterScreenShot.path });
		} else {
			console.error('Not found element in master', pageConfig);
			return;
		}

		let branchScreenShot;
		const branchElement = await branchPage.$(pageConfig.selector);
		if (branchElement) {
			branchScreenShot = await tmp.file(TMP_CONFIG);
			await branchElement.screenshot({ path: branchScreenShot.path });
		} else {
			console.error('Not found element in branch', pageConfig);
			return;
		}
		log('Read img for master');
		const img1 = PNG.sync.read(fs.readFileSync(masterScreenShot.path));
		log('-- ok');
		log('Read img for PR');
		const img2 = PNG.sync.read(fs.readFileSync(branchScreenShot.path));
		log('-- ok');
		log('compute diff');
		const diff = new PNG({ width: img1.width, height: img1.height });
		const howmuch = pixelmatch(
			img1.data,
			img2.data,
			diff.data,
			img1.width,
			img1.height,
			{ threshold: 0.1 }
		);
		if (howmuch > 0) {
			const diffScreenShot = await tmp.file({ prefix: pageConfig.name, keep: true, ...TMP_CONFIG });
			console.error(`#### ${howmuch} pixel differ from the original one ${diffScreenShot.path}`);
			diff.pack().pipe(fs.createWriteStream(diffScreenShot.path));
		} else {
			log('-- no diff');
		}
	});
}
(async () => {
	log('Launch puppeteer');
	const browser = await puppeteer.launch();
	log('Open browser for master pages');
	const masterPage = await browser.newPage();
	log('Open browser for PR pages');
	const branchPage = await browser.newPage();

	await asyncForEach(Object.keys(config), async path => {
		await compare(masterPage, branchPage, path);
	});

	log('Close browser');
	await browser.close();
})();
