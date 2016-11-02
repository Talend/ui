import React from 'react';
import invariant from 'invariant';
import classnames from 'classnames';
import theme from './Icon.scss';

const registry = {};

function register(id, svg) {
	registry[id] = svg;
}

function getSVG(id) {
	return registry[id];
}

/**
 * SVG implementation is inspired by
 * http://svgicons.sparkk.fr/
 * @param {object} props react props
 * @example
<Icon name="fa-bars"></Icon>
 */
function Icon(props) {
	const id = props.name;
	const accessibility = {
		'aria-hidden': 'true',
		title: props.title || null,
	};
	if (id.startsWith('fa-')) {
		return (<i className={`fa ${id}`} {...accessibility} />);
	}
	if (id.startsWith('fa fa-') || id.startsWith('icon-')) {
		return (<i className={id} {...accessibility} />);
	}
	if (registry[id]) {
		const classname = classnames(theme['svg-icon'], 'tc-svg-icon');
		return (
			<svg className={classname} {...accessibility}>
				{getSVG(id)}
			</svg>
		);
	}
	invariant(false, `icon not found ${id}`);
}

Icon.propTypes = {
	name: React.PropTypes.string.isRequired,
	title: React.PropTypes.string,
};

Icon.register = register;
Icon.registry = registry;
export default Icon;
