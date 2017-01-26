const webpage = require('webpage');  // eslint-disable-line

const { baseurl, viewport, stories } = require('./../screenshots.config.json');

const SCRIPT = 'document.body.style.pointerEvents = \'none\';';

const capture = (page, targetFile, clipRect) => {
	try {
		page.clipRect = clipRect;  // eslint-disable-line no-param-reassign
		slimer.wait(500);  // eslint-disable-line no-undef
		page.render(targetFile, {
			onlyViewport: false,
		});
	} catch (e) {
		console.log(`Failed to capture screenshot as ${targetFile} : ${e}`);  // eslint-disable-line no-console
	}
	return page;
};

const captureSelector = (page, targetFile, selector) => {
	//console.log(selector);
	const elm = page.evaluate((selector) => {
		//console.log(selector);
		clipRect = document.querySelector(selector).getBoundingClientRect();
		return {
			top: clipRect.top,
			left: clipRect.left,
			width: clipRect.width,
			height: clipRect.height,
		};
	}, selector);
	return capture(page, targetFile, elm);
};

const opened = [];

Object.keys(stories).forEach((component) => {
	Object.keys(stories[component]).forEach((usecase) => {
		const page = webpage.create();
		const popened =
			page.open(
			`${baseurl}&selectedKind=${component}&selectedStory=${usecase}`
		);
		opened.push(popened.then(() => {
			//console.log('opened', component, usecase);
			const mapping = stories[component][usecase];
			page.viewportSize = viewport;
			page.evaluateJavaScript(SCRIPT);
			const shots = mapping.map(
				({ selector, name }) => {
					if (Array.isArray(selector)) {
						return Promise.all(
							selector.map((sel, index) => captureSelector(
								page, `screenshots/${name}-${index}.png`, sel
							))
						);
					}
					return captureSelector(
						page, `screenshots/${name}.png`, selector
					);
				}
			);
			return Promise.all(shots);
		}));
	});
});
Promise.all(opened).then(() => {
	slimer.exit();  // eslint-disable-line no-undef
}, (error) => {
	console.error(error);
	slimer.exit();  // eslint-disable-line no-undef
});
