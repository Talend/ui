// custom inject to UMD from surge and the others from unpkg

(function () {
	const CDN_URL_REGEX = /^(\/?.*\/cdn)\//;

	function prepareUrl(url) {
		let newUrl;
		const m = CDN_URL_REGEX.exec(url);
		if (m !== null) {
			//	return base ? url.slice(1) : url;
			if (!url.includes('/cdn/@talend') && !url.includes('/cdn/ag-grid-react')) {
				newUrl = url.replace(m[1], 'https://statics.cloud.talend.com');
			}
		}
		return newUrl || url;
	}
	window.Talend.getCDNUrl = function getCDNUrl(pkg = {}) {
		if (pkg.name.startsWith('@talend') || pkg.name.startsWith('ag-grid-react')) {
			return '/cdn';
		}
		return 'https://statics.cloud.talend.com';
	};
	window.talendAddStyles(window.Talend.cssBuild, prepareUrl);
	window.talendAddScripts(window.Talend.build, prepareUrl);
})();
