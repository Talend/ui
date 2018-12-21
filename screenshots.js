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
	.option('-t, --timeout [time]', 'timeout for waiting surge upload')
	.option('-m, --maxTry [nb max try]', 'maximum try before stopped the process')
	.parse(process.argv);

const PR = program.pullrequest;
const SURGE_TIMEOUT = program.timeout || 30000;
const SURGE_MAX_RETRY = program.maxTry > 1 ? program.maxTry : 1;
const ERROR_SURGE_UNAVAILABLE = 'ERROR_SURGE_UNAVAILABLE';
let errorWithSurgeMaster = false;
let errorWithSurgePR = false;

if (!PR) {
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

function getUrl(isMaster) {
	if (isMaster) {
		return 'http://talend.surge.sh/';
	}
	return `http://${PR}.talend.surge.sh/`;
}

const TMP_CONFIG = { postfix: '.png' };

const screenshotTest = (async () => {
	async function asyncForEach(array, callback) {
		for (let index = 0; index < array.length; index += 1) {
			await callback(array[index], index, array);
		}
	}

	async function getScreenShot(page, config) {
		let screenshot;
		if (config.click) {
			await page.evaluate(() => {
				return new Promise(resolve => {
					setInterval(() => {
						// the code can t rely on config ...
						const btn = document.querySelector('button');
						if (btn) {
							btn.click();
							resolve();
						}
					}, 100);
					return true;
				});
			});
		}
		const element = await page.$(`${config.selector}`);
		if (element) {
			screenshot = await tmp.file(TMP_CONFIG);
			await element.screenshot({ path: screenshot.path });
		} else {
			console.error(`Not found element ${config.name} at ${page.url()}`);
			return undefined;
		}
		return screenshot;
	}

	async function goToPage(page, url) {
		await page.goto(url);
	}

	async function process(masterPage, branchPage, pageConfig) {
		log(`Process ${pageConfig.name} ${pageConfig.selector}`);
		const masterScreenShot = await getScreenShot(masterPage, pageConfig);
		const branchScreenShot = await getScreenShot(branchPage, pageConfig);
		log('Read img master');
		if (!masterScreenShot) {
			console.error('-- do not exists on master');
			return;
		}
		const masterImage = PNG.sync.read(fs.readFileSync(masterScreenShot.path));
		log('-- ok');
		log('Read img PR');
		const branchImage = PNG.sync.read(fs.readFileSync(branchScreenShot.path));
		if (!branchImage) {
			console.error('-- do not exists on PR');
			return;
		}
		log('-- ok');
		log('compute diff');
		const diff = new PNG({ width: masterImage.width, height: masterImage.height });
		const diffPixel = pixelmatch(
			masterImage.data,
			branchImage.data,
			diff.data,
			masterImage.width,
			masterImage.height,
			{ threshold: 0.1 },
		);
		if (diffPixel > 0) {
			const diffScreenShot = await tmp.file({ prefix: pageConfig.name, keep: true, ...TMP_CONFIG });
			console.error(`-- ${diffPixel} pixels differ from the original one ${diffScreenShot.path}`);
			diff.pack().pipe(fs.createWriteStream(diffScreenShot.path));
		} else {
			log('-- no diff');
		}
	}

	function onResponse(page, isMaster, pageUrls) {
		page.on('response', async res => {
			if (pageUrls.includes(res.url()) && res.status() === 404) {
				console.error(`Surge is not ready yet ${isMaster ? 'for Master' : `for the PR ${PR}`}: ${res.url()}`);
				if (isMaster) {
					errorWithSurgeMaster = true;
				} else {
					errorWithSurgePR = true;
				}
			}
		});
	}

	async function compare(masterPage, branchPage, path = 'theme') {
		log(`\nCompare ${path}`);
		log('Go to master page');
		await goToPage(masterPage, `${getUrl(true)}${path}`);
		log('-- ok');
		log('Go to PR page');
		await goToPage(branchPage, `${getUrl(false)}${path}`);
		log('-- ok');
		if (errorWithSurgeMaster || errorWithSurgePR) {
			throw new Error(ERROR_SURGE_UNAVAILABLE);
		}
		await asyncForEach(config[path], async config => await process(masterPage, branchPage, config));
	}

	log('Launch puppeteer');
	const browser = await puppeteer.launch();
	log('Open browser for master pages');
	const masterPage = await browser.newPage();
	onResponse(masterPage, true, Object.keys(config).map(path => `${getUrl(true)}${path}`));
	log('Open browser for PR pages');
	const branchPage = await browser.newPage();
	onResponse(branchPage, false, Object.keys(config).map(path => `${getUrl(false)}${path}`));

	await asyncForEach(Object.keys(config), async path => {
		try {
			await compare(masterPage, branchPage, path);
		} catch (error) {
			if (error.message === ERROR_SURGE_UNAVAILABLE) {
				throw error;
			} else {
				console.error(path, error);
			}
		}
	});

	log('Close browser');
	await browser.close();
});

async function runScreenshot(nbCurrentRetry) {
	try {
		await screenshotTest();
	} catch (e) {
		if (nbCurrentRetry < SURGE_MAX_RETRY) {
			console.error(`retry the non regression in ${SURGE_TIMEOUT}ms (${nbCurrentRetry}/${SURGE_MAX_RETRY})`);
			await new Promise(resolve => setInterval(resolve, SURGE_TIMEOUT));
			runScreenshot(nbCurrentRetry + 1);
		}
		if (nbCurrentRetry >= SURGE_MAX_RETRY) {
			console.error(`Max try to make non regression exceeded (${nbCurrentRetry}/${SURGE_MAX_RETRY}). Please wait the C-I's upload to Surge`);
			process.exit();
		}
	}
}

runScreenshot(1);
