import React from 'react';
import styled from 'styled-components';
import SVG from 'react-inlinesvg';

import icons from '../../icons';

import tokens from '../../tokens';

export type IconName =
	| 'arrowLeft'
	| 'caret'
	| 'cross'
	| 'check'
	| 'datagrid'
	| 'eye'
	| 'eyeSlash'
	| 'information'
	| 'link'
	| 'minus'
	| 'plus'
	| 'search'
	| 'talend'
	| 'upload'
	| 'validate'
	| 'warning';

export type IconProps = {
	/** The name of the icon  */
	name: IconName;

	className?: string;
};

const SSVG = styled(SVG)(
	({ preserveColors }) => `
	width: ${tokens.sizes.l};
	height: ${tokens.sizes.l};

	path {
		${preserveColors ? '' : 'fill: currentColor'};
	}
`,
);

// TODO https://medium.com/@allalmohamedlamine/react-best-way-of-importing-svg-the-how-and-why-f7c968272dd9
export default function Icon({ name, preserveColors, ...rest }: IconProps) {
	if (!Object.keys(icons).find(iconName => iconName === name)) {
		return null;
	}
	return (
		<SSVG
			className="icon"
			preserveColors={preserveColors}
			src={icons[name]}
			aria-hidden
			{...rest}
		/>
	);
}
