import PropTypes from 'prop-types';
import React from 'react';
import { react as talendIcons, info } from '@talend/icons';

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
		if (process.env.ICON_BUNDLE) {
			href = info.getIconHREF(name);
		} else {
			// backward compatibility for test
			href = `#${name}`;
		}
	}
	return href;
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
function IconsProvider({ defaultIcons = talendIcons, icons = {}, getIconHref = () => {} }) {
	const iconset = { ...defaultIcons, ...icons };
	const ids = Object.keys(iconset);
	context.ids = ids;
	context.get = getIconHref;
	return (
		<svg xmlns="http://www.w3.org/2000/svg" focusable="false" className="sr-only">
			{ids.map((id, index) => (
				<symbol key={index} id={id}>
					{iconset[id]}
				</symbol>
			))}
			{Object.keys(talendIcons.filters).map((id, index) => (
				<svg key={`svg-filter-${index}`} id={id}>
					{talendIcons.filters[id]}
				</svg>
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
};

IconsProvider.getIconHREF = getIconHREF;
export default IconsProvider;
