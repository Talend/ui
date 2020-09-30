import PropTypes from 'prop-types';
import React from 'react';

const DEFAULT_BUNDLES = ['/all.svg'];

const talendIcons = {};

const context = {
	ids: [],
	// default no op for testing (case of Icon call without IconsProvider)
	get: () => {},
};

// TODO 6.0: do not export this
export function getIconHREF(name) {
	if (context.ids.indexOf(name) !== -1) {
		return `#${name}`;
	}
	let href = context.get(name);
	if (!href) {
		// backward compatibility for test
		href = `#${name}`;
	}
	return href;
}

const FETCHING = { urls: [] };

function isFetching(url) {
	return FETCHING.urls.indexOf(url) !== -1;
}

function hasBundle(url) {
	const results = document.querySelectorAll('.tc-iconsprovider');
	return (
		Array.prototype.slice.call(results).filter(e => {
			return e.getAttribute('data-url') === url;
		}).length >= 1
	);
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
function IconsProvider({
	bundles = DEFAULT_BUNDLES,
	defaultIcons = talendIcons,
	icons = {},
	getIconHref = () => {},
}) {
	const iconset = { ...defaultIcons, ...icons };
	const ids = Object.keys(iconset);
	context.ids = ids;
	context.get = getIconHref;
	React.useEffect(() => {
		if (!Array.isArray(bundles)) {
			return;
		}
		bundles.filter(url => {
				return !hasBundle(url) && !isFetching(url);
			})
			.forEach(url => {
				FETCHING.urls.push(url);
				fetch(url)
					.then(addBundle)
					.finally(() => {
						FETCHING.urls.splice(FETCHING.urls.indexOf(url), 1);
					});
			});
	}, [bundles]);
	return (
		<svg xmlns="http://www.w3.org/2000/svg" focusable="false" className="sr-only">
			{ids.map((id, index) => (
				<symbol key={index} id={id}>
					{iconset[id]}
				</symbol>
			))}
		</svg>
	);
}

IconsProvider.displayName = 'IconsProvider';
IconsProvider.context = context;
IconsProvider.propTypes = {
	defaultIcons: PropTypes.object, // eslint-disable-line react/forbid-prop-types
	icons: PropTypes.object, // eslint-disable-line react/forbid-prop-types
	getIconHref: PropTypes.func, // eslint-disable-line react/forbid-prop-types
	bundles: PropTypes.arrayOf(PropTypes.string),
};

IconsProvider.getIconHREF = getIconHREF;
export default IconsProvider;
