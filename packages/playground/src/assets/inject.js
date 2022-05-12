// custom inject to UMD from surge and the others from unpkg

// eslint-disable-next-line func-names
(function () {
	const CDN_URL_REGEX = /^(\/?.*\/cdn)\//;

	function removeIntegrity(info) {
		if (info.name && info.name.startsWith('@talend')) {
			// eslint-disable-next-line no-param-reassign
			delete info.integrity;
		}
		return info;
	}

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
	window.Talend.CDN_URL = 'https://statics.cloud.talend.com';

	// let's override the assets-api's getCDNUrl to serve local package
	window.Talend.getCDNUrl = function getCDNUrl(pkg = {}) {
		// if local to the repository load from /cdn
		if (['@talend/react-dataviz', '@talend/icons'].includes(pkg.name)) {
			const baseTag = document.querySelector('base');
			if (baseTag) {
				const root = baseTag.getAttribute('href') || '';
				return `${root}/cdn/${pkg.name}/${pkg.version}${pkg.path}`;
			}
			return `/cdn/${pkg.name}/${pkg.version}${pkg.path}`;
		}
		return `${window.Talend.CDN_URL}/${pkg.name}/${pkg.version}${pkg.path}`;
	};

  window.talendAddStyles(window.Talend.cssBuild.map(removeIntegrity), prepareUrl);
	window.talendAddScripts(window.Talend.build.map(removeIntegrity), prepareUrl);
})();
