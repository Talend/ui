const webpage = require('webpage').create();

const { baseurl, viewport, stories } = require('./../screenshots.config.json');

//`${baseurl}&selectedKind=${component}&selectedStory=${usecase}

const capture = (targetFile, clipRect) => {
	try {
		webpage.clipRect = clipRect;
		webpage.render(targetFile, {
			onlyViewport: false,
		});
	} catch (e) {
		console.log(`Failed to capture screenshot as ${targetFile} : ${e}`);
	}
	return this;
};

const captureSelector = (targetFile, selector) => {
	const elm = webpage.evaluate((selector) => {
		try {
			const clipRect = document.querySelector(selector).getBoundingClientRect();
			return {
				top: clipRect.top,
				left: clipRect.left,
				width: clipRect.width,
				height: clipRect.height,
			};
		} catch (e) {
			console.log(`Unable to fetch bounds for element ${selector}`);
		}
	}, selector);
	return capture(targetFile, elm);
};

Object.keys(stories).forEach((component) => {
	//AppHeaderBar
	Object.keys(stories[component]).forEach((usecase) => {
		webpage.open(
			`${baseurl}&selectedKind=${component}&selectedStory=${usecase}`
		).then(() => {
			const mapping = stories[component][usecase];
			webpage.viewportSize = viewport;
			mapping.forEach(({ selector, name }) => captureSelector(`screenshots/${name}.png`, selector));
			slimer.exit();
		});
	});
});
