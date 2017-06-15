const fs = require('fs');
const mkdirp = require('mkdirp');
const webdriver = require('selenium-webdriver');
const remote = require('selenium-webdriver/remote');

// Input capabilities
const stories = [
	{
		name: 'List',
		variations: [
			'Table (default)',
		],
	},
];
const osBrowserMatrix = [
	{
		name: 'Windows',
		version: '7',
		browsers: [
			'IE 11.0',
			'Chrome 57.0',
		],
	},
	{
		name: 'OS X',
		version: 'Sierra',
		browsers: [
			// 'Safari 10.0',
			'Chrome 57.0',
		],
	},
];

osBrowserMatrix.forEach(os => {
	os.browsers.forEach(browser => {
		const browserArray = browser.split(' ');
		const browserName = browserArray[0];
		const browserVersion = browserArray[1];
		const capabilities = {
			os: os.name,
			os_version: os.version,
			browserName,
			browser_version: browserVersion,
			resolution: '1024x768',
			'browserstack.user': process.env.BROWSERSTACK_USER,
			'browserstack.key': process.env.BROWSERSTACK_KEY,
		};

		const driver = new webdriver.Builder()
			.usingServer('http://hub-cloud.browserstack.com/wd/hub')
			.withCapabilities(capabilities)
			.build();

		webdriver.WebDriver.prototype.saveScreenshot = function (filename) {
			return driver.takeScreenshot().then((data) => {
				fs.writeFile(filename, data.replace(/^data:image\/png;base64,/, ''), 'base64', (err) => {
					if (err) throw err;
				});
			});
		};

		driver.setFileDetector(new remote.FileDetector());

		const folderName = `${os.name}_${os.version}-${browser}`.split(' ').join('_');
		mkdirp(folderName, (err) => {
			// path exists unless there was an error
			if (err) throw err;
		});

		stories.forEach(story => {
			story.variations.forEach(variation => {
				const group = `${os.name} ${os.version} and ${browserName} ${browserVersion}`;
				console.log(`Generate "${story.name} / ${variation}" screenshot for ${group}`);
				const pullRequestNumber = process.env.TRAVIS_PULL_REQUEST;
				const pullRequestPrefix = pullRequestNumber ? `${pullRequestNumber}.` : '';
				driver.get(`http://${pullRequestPrefix}talend.surge.sh/components/?selectedKind=${encodeURI(story.name)}&selectedStory=${encodeURI(variation)}&full=1&down=1&left=1&panelRight=0&downPanel=kadirahq%2Fstorybook-addon-actions%2Factions-panel`);
				driver.saveScreenshot(`${folderName}/${story.name}_${variation}.png`);
			});
		});

		driver.quit();
	});
});
