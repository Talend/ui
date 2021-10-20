// custom inject to UMD from surge and the others from unpkg

const base = document.querySelector('base');

const preparebaseUrl = url => (base ? url.slice(1) : url);

function prepareUrl(builtUrl) {
	const url = preparebaseUrl(builtUrl);

	if (url.startsWith('/cdn')) {
		if (url.startsWith('/cdn/@talend')) {
			let newUrl = url.split('/');
			newUrl.splice(4, 1); // remove version
			newUrl = newUrl.join('/').replace('/cdn', document.baseURI);
			// newUrl = newUrl.replace(window.location.origin, 'http://3428.talend.surge.sh');
			console.log(`playground inject debug: replace ${url} by  ${newUrl}`);
			return newUrl;
		}
		return url.replace('/cdn', 'https://statics.cloud.talend.com');
	}
	return url;
}

window.talendAddStyles(window.cssFiles, prepareUrl);
window.talendAddScripts(window.jsFiles, prepareUrl);
