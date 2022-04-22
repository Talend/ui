// custom inject to UMD from surge and the others from unpkg

(function () {
	const CDN_URL_REGEX = /^(\/?.*\/cdn)\//;

	const PKGS = [
		'@talend/design-system',
		'@talend/design-tokens',
		'@talend/react-components',
		'@talend/react-containers',
		'@talend/react-cmf',
		'@talend/react-cmf-router',
		'@talend/react-dataviz',
		'@talend/react-faceted-search',
		'@talend/react-datagrid',
		'@talend/react-forms',
		'@talend/bootstrap-theme',
		'@talend/icons',
	];
	function removeIntegrityOnDev(info) {
		if (PKGS.includes(info.name)) {
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
	window.Talend.getCDNUrl = function getCDNUrl(pkg = {}) {
		if (PKGS.includes(pkg.name)) {
			const baseTag = document.querySelector('base');
			if (baseTag) {
				const root = baseTag.getAttribute('href') || '';
				return `${root}/cdn/${pkg.name}/${pkg.version}${pkg.path}`;
			}
			return `/cdn/${pkg.name}/${pkg.version}${pkg.path}`;
		}
		return `https://unpkg.com/${pkg.name}@${pkg.version}${pkg.path}`;
	};
	window.talendAddStyles(window.Talend.cssBuild.map(removeIntegrityOnDev), prepareUrl);
	window.talendAddScripts(window.Talend.build.map(removeIntegrityOnDev), prepareUrl);
})();
