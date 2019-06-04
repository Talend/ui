import PropTypes from 'prop-types';
import React from 'react';
import talendIcons, { filters } from '@talend/icons/dist/react';
import bundleInfo from '@talend/icons/dist/info';

const context = {};

export function getIconBundle(name) {
	if (!name.startsWith('talend-')) {
		return undefined;
	}
	if (context.ids.indexOf(name) !== -1) {
		return undefined;
	}
	const iconId = name.split('talend-')[1];
	return (context.bundles || {})[iconId] || bundleInfo[iconId];
}

export function getIconHREF(name) {
	const bundle = getIconBundle(name) || '';
	return `${bundle}#${name}`;
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
function IconsProvider({ defaultIcons, icons, bundles }) {
	const iconset = Object.assign({}, defaultIcons, icons);
	const ids = Object.keys(iconset);
	context.ids = ids; // refresh
	context.bundles = bundles;
	return (
		<React.Fragment>
			<svg xmlns="http://www.w3.org/2000/svg" focusable="false" className="sr-only">
				{ids.map((id, index) => (
					<symbol key={index} id={id}>
						{iconset[id]}
					</symbol>
				))}
				{Object.keys(filters).map((id, index) => (
					<svg key={`svg-filter-${index}`} id={id}>
						{filters[id]}
					</svg>
				))}
			</svg>
		</React.Fragment>
	);
}

IconsProvider.displayName = 'IconsProvider';
IconsProvider.context = context;
IconsProvider.propTypes = {
	defaultIcons: PropTypes.object, // eslint-disable-line react/forbid-prop-types
	icons: PropTypes.object, // eslint-disable-line react/forbid-prop-types
	bundles: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

IconsProvider.defaultProps = {
	defaultIcons: talendIcons,
	icons: {},
};
export default IconsProvider;
