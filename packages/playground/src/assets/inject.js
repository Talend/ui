// custom inject to UMD from surge and the others from unpkg

(function () {
	const CDN_URL_REGEX = /^(\/?.*\/cdn)\//;

	function prepareUrl(url) {
		let newUrl;
		const m = CDN_URL_REGEX.exec(url);
		if (m !== null) {
			//	return base ? url.slice(1) : url;

			if (!url.includes('/cdn/@talend')) {
				newUrl = url.replace(m[1], 'https://statics.cloud.talend.com');
			}
		}
		return newUrl || url;
	}

	window.talendAddStyles(window.cssFiles, prepareUrl);
	window.talendAddScripts(window.jsFiles, prepareUrl);
})();
