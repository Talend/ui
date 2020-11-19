import PropTypes from 'prop-types';
import React from 'react';

const DEFAULT_BUNDLES = ['/all.svg'];
const FETCHING_BUNDLES = {};

function hasBundle(url) {
	if (FETCHING_BUNDLES[url]) {
		return true;
	}

	const results = document.querySelectorAll('.tc-iconsprovider');
	return (
		Array.prototype.slice.call(results).filter(e => {
			return e.getAttribute('data-url') === url;
		}).length >= 1
	);
}

/**
 * This function return the list of available icons in the document
 * @returns <Array<string>> Array of id if available icons
 */
function getAllIconIds() {
	return Promise.all(Object.values(FETCHING_BUNDLES)).then(() => {
		const symbols = document.querySelectorAll('.tc-iconsprovider symbol');
		return Array.from(symbols)
			.map(symbol => symbol.getAttribute('id'))
			.filter(Boolean);
	});
}

/**
 * This function return the list of available filter in the document
 * @returns {Array<string>} Array of id if available filters
 */
function getAllFilterIds() {
	const symbols = document.querySelectorAll('.tc-iconsprovider filter');
	return Array.from(symbols)
		.map(symbol => symbol.getAttribute('id'))
		.filter(Boolean);
}

/**
 * clone the icon with the id and add it to the container
 * @param {string} id
 * @param {Element} container
 */
function injectIcon(id, container) {
	const element = document.querySelector(`.tc-iconsprovider #${id}`);
	if (element) {
		while (container.hasChildNodes()) {
			container.removeChild(container.lastChild);
		}
		container.appendChild(element.children[0].cloneNode(true));
	} else if (Object.keys(FETCHING_BUNDLES).length) {
		Promise.all(Object.values(FETCHING_BUNDLES)).then(() => injectIcon(id, container));
	}
}

/**
 * add the content of the reponse into the dom if it starts with SVG
 */
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
	return Promise.resolve(response);
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
function IconsProvider({ bundles = DEFAULT_BUNDLES, defaultIcons = {}, icons = {} }) {
	const iconset = { ...defaultIcons, ...icons };

	React.useEffect(() => {
		if (!Array.isArray(bundles)) {
			return;
		}
		bundles
			.filter(url => !hasBundle(url))
			.forEach(url => {
				FETCHING_BUNDLES[url] = fetch(url)
					.then(addBundle)
					.finally(() => {
						delete FETCHING_BUNDLES[url];
					});
			});
	}, [bundles]);
	return (
		<>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				focusable="false"
				className="sr-only tc-iconsprovider"
			>
				{Object.keys({ ...defaultIcons, ...icons }).map((id, index) => (
					<symbol key={index} id={id}>
						{iconset[id]}
					</symbol>
				))}
			</svg>
		</>
	);
}

IconsProvider.displayName = 'IconsProvider';
IconsProvider.propTypes = {
	defaultIcons: PropTypes.object,
	icons: PropTypes.object,
	bundles: PropTypes.arrayOf(PropTypes.string),
};
IconsProvider.getAllIconIds = getAllIconIds;
IconsProvider.getAllFilterIds = getAllFilterIds;
IconsProvider.injectIcon = injectIcon;

export default IconsProvider;
