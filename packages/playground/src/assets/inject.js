// custom inject to UMD from surge and the others from unpkg

(function () {
	function prepareUrl(url) {
		let newUrl;
		if (url.startsWith('/cdn')) {
			if (url.startsWith('/cdn/@talend') && !url.startsWith('/cdn/@talend/design-system')) {
				// code specific target to surge
				newUrl = url.split('/');
				newUrl.splice(4, 1); // remove version
				newUrl = newUrl.join('/').replace('/cdn', '');
				// newUrl = newUrl.replace(window.location.origin, 'http://3428.talend.surge.sh');
			} else {
				newUrl = url.replace('/cdn', 'https://statics.cloud.talend.com');
			}
		} else if (url.startsWith('/')) {
			// basename is added by ui-scripts
			newUrl = url.replace('/', `${window.basename}/`);
		}
		if (newUrl) {
			// eslint-disable-next-line no-console
			console.log(`inject debug: replace ${url} by  ${newUrl}`);
		}
		return newUrl || url;
	}

	window.talendAddStyles(window.cssFiles, prepareUrl);
	window.talendAddScripts(window.jsFiles, prepareUrl);
})();
