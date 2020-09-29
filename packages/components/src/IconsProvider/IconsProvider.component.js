import PropTypes from 'prop-types';
import React from 'react';

const DEFAULT_BUNDLES = [
	'/all.svg',
];

// TODO 6.0: do not export this
export function getIconHREF(name) {
	return `#${name}`;
}

const FETCHING = { urls: [] };

function isFetching(url) {
	return FETCHING.urls.indexOf(url) !== -1;
}

function hasBundle(url) {
	const results = document.querySelectorAll('.tc-iconsprovider');
	return Array.prototype.slice.call(results).filter(e => {
		return e.getAttribute('data-url') === url;
	}).length >= 1;
}

function addBundle(response) {
	if (response.status === 200 && response.ok) {
		return response.text().then(content => {
			if (content.startsWith('<svg')) {
				const container = document.createElement('svg');
				container.setAttribute('class', 'tc-iconsprovider sr-only');
				container.setAttribute('focusable', false);
				container.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
				container.setAttribute('data-url', new URL(response.url).pathname);
				container.innerHTML = content;
				document.body.appendChild(container);
			}
		});
	}
	return new Promise(resolve => resolve());
}

/**
 * If you want to use Icon with SVG you have to load this
 * component in your app.
 * If you don't pass any props you will have our default
 * iconset (please look at talend-icons in that case)
 * @param {object} props react props
 * @example
<IconsProvider />
 */
function IconsProvider({ bundles = DEFAULT_BUNDLES }) {
	React.useEffect(() => {
		if (Array.isArray(bundles)) {
			bundles.filter(url => {
				return !hasBundle(url) && !isFetching(url);
			}).forEach(url => {
				FETCHING.urls.push(url);
				fetch(url).then(addBundle).finally(() => {
					FETCHING.urls.splice(FETCHING.urls.indexOf(url), 1);
				});
			});
		}
	}, [bundles]);
	return null;
}

IconsProvider.displayName = 'IconsProvider';
IconsProvider.getIconHREF = getIconHREF;
IconsProvider.propTypes = {
	bundles: PropTypes.arrayOf(PropTypes.string),
};

export default IconsProvider;
