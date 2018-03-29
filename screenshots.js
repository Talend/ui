const program = require('commander');
const fs = require('fs');
const tmp = require('tmp-promise');
const PNG = require('pngjs').PNG;
const pixelmatch = require('pixelmatch');
const puppeteer = require('puppeteer');


program
.option('-p, --pullrequest [pr]', 'Pull request')
.option('-c, --config [config]', 'JSON config file')
.option('-v, --verbose', 'Verbose')
.parse(process.argv);

const PR = program.pullrequest;

if (!PR && !program.url) {
	console.error('you must precise a PR number using -p or --pullrequest');
	process.exit();
}

let config = {};

if (program.config) {
	config = require(program.config);
} else {
	const files = fs.readdirSync('./screenshots');
	files.forEach(filepath => {
		if (filepath.endsWith('.json')) {
			Object.assign(config, require(`./screenshots/${filepath}`));
		}
	});
}

function log(msg) {
	if (program.verbose) {
		console.log(msg);
	}
}

const TMP_CONFIG = { postfix: '.png' };


(async () => {
	async function asyncForEach(array, callback) {
		for (let index = 0; index < array.length; index += 1) {
			await callback(array[index], index, array);
		}
	}


	async function getScreenShot(page, config) {
		let screenshot;
		const element = await page.$(`${config.selector}`);
		if (!!element) {
			screenshot = await tmp.file(TMP_CONFIG);
			await element.screenshot({ path: screenshot.path });
		} else {
			console.error(`Not found element ${config.name} at ${page.url()}`);
			return;
		}
		return screenshot;
	}

	async function process(masterPage, branchPage, pageConfig) {
		log(`Process ${pageConfig.name} ${pageConfig.selector}`);
		const masterScreenShot = await getScreenShot(masterPage, pageConfig);
		const branchScreenShot = await getScreenShot(branchPage, pageConfig);
		log('Read img master');
		const masterImage = PNG.sync.read(fs.readFileSync(masterScreenShot.path));
		log('-- ok');
		log('Read img PR');
		const branchImage = PNG.sync.read(fs.readFileSync(branchScreenShot.path));
		log('-- ok');
		log('compute diff');
		const diff = new PNG({ width: masterImage.width, height: masterImage.height });
		const diffPixel = pixelmatch(masterImage.data, branchImage.data, diff.data, masterImage.width, masterImage.height, { threshold: 0.1 });
		if (diffPixel > 0) {
			const diffScreenShot = await tmp.file({ prefix: pageConfig.name, keep: true, ...TMP_CONFIG });
			console.error(`-- ${diffPixel} pixels differ from the original one ${diffScreenShot.path}`);
			diff.pack().pipe(fs.createWriteStream(diffScreenShot.path));
		} else {
			log('-- no diff');
		}
	}

	async function compare(masterPage, branchPage, path='theme') {
		log(`\nCompare ${path}`);
		let filesRead = 0;
		log('Go to master page');
		await masterPage.goto(`http://talend.surge.sh/${path}`);
		log('-- ok');
		log('Go to PR page');
		await branchPage.goto(`http://${PR}.talend.surge.sh/${path}`);
		log('-- ok');

		await asyncForEach(config[path], async (config) => await process(masterPage, branchPage, config));
	}

	log('Launch puppeteer');
	const browser = await puppeteer.launch();
	log('Open browser for master pages');
	const masterPage = await browser.newPage();
	log('Open browser for PR pages');
	const branchPage = await browser.newPage();

	await asyncForEach(Object.keys(config), async path => {
		try {
			await compare(masterPage, branchPage, path);
		} catch(error) {
			console.error(path, error);
		}
	});

	log('Close browser');
	await browser.close();
})();
