import PropTypes from 'prop-types';
import React from 'react';

const DEFAULT_BUNDLES = ['/all.svg'];

// breaking change here: no more required react icons data structure
const talendIcons = {};
const IconsContext = React.createContext(talendIcons);

// same here we keep it so if you refer to it
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

function hasBundle(url) {
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
	const symbols = document.querySelectorAll('.tc-iconsprovider symbol');
	return Array.from(symbols)
		.map(symbol => symbol.getAttribute('id'))
		.filter(Boolean);
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
		container.appendChild(element.children[0].cloneNode(true));
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
	children,
	// deprecated
	defaultIcons = talendIcons,
	icons = {},
	getIconHref = () => {},
}) {
	const iconset = { ...defaultIcons, ...icons };
	const ids = Object.keys(iconset);
	const [FETCHING, setFetching] = React.useState([]);
	context.ids = getAllIconIds().concat(ids);
	context.get = getIconHref;
	React.useEffect(() => {
		if (!Array.isArray(bundles)) {
			return;
		}
		bundles
			.filter(url => !hasBundle(url) && FETCHING.indexOf(url) === -1)
			.forEach(url => {
				FETCHING.push(url);
				setFetching(FETCHING);
				fetch(url)
					.then(addBundle)
					.finally(() => {
						FETCHING.splice(FETCHING.indexOf(url), 1);
						setFetching(FETCHING);
					});
			});
	}, [bundles, FETCHING]);
	return (
		<>
			<svg xmlns="http://www.w3.org/2000/svg" focusable="false" className="sr-only">
				{ids.map((id, index) => (
					<symbol key={index} id={id}>
						{iconset[id]}
					</symbol>
				))}
			</svg>
			<IconsContext.Provider value={{ ids: context.ids }}>{children}</IconsContext.Provider>
		</>
	);
}

IconsProvider.displayName = 'IconsProvider';
IconsProvider.propTypes = {
	defaultIcons: PropTypes.object, // eslint-disable-line react/forbid-prop-types
	icons: PropTypes.object, // eslint-disable-line react/forbid-prop-types
	getIconHref: PropTypes.func, // eslint-disable-line react/forbid-prop-types
	bundles: PropTypes.arrayOf(PropTypes.string),
	children: PropTypes.any,
};
IconsProvider.getAllIconIds = getAllIconIds;
IconsProvider.getAllFilterIds = getAllFilterIds;
IconsProvider.injectIcon = injectIcon;
IconsProvider.reactContext = IconsContext;

// backward compat should not be used anymore
IconsProvider.context = context;
IconsProvider.getIconHREF = getIconHREF;

export default IconsProvider;
