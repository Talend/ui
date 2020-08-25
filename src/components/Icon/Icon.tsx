import React from 'react';
import styled, { StyledProps } from 'styled-components';
import { BoxProps } from 'reakit';
import SVG, { Props as InlineSVGProps } from 'react-inlinesvg';
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
	| 'opener'
	| 'plus'
	| 'search'
	| 'talend'
	| 'talendLogo'
	| 'upload'
	| 'validate'
	| 'warning';

export type IconProps = BoxProps &
	StyledProps<any> &
	Omit<InlineSVGProps, 'src'> & {
		/** The name of the icon  */
		name: IconName;
		src?: string;
	};

const SSVG = styled(SVG)<IconProps & { preserveColors: boolean }>(
	({ preserveColors }) => `
	width: ${tokens.sizes.l};
	height: ${tokens.sizes.l};

	path {
		${preserveColors ? '' : 'fill: currentColor;'}
	}
`,
);

// TODO https://medium.com/@allalmohamedlamine/react-best-way-of-importing-svg-the-how-and-why-f7c968272dd9
const Icon: React.FC<IconProps> = React.forwardRef(
	({ className, name, ...rest }: IconProps, ref) => {
		if (!Object.keys(icons).find(iconName => iconName === name)) {
			return null;
		}
		return <SSVG aria-hidden {...rest} src={icons[name]} className={`icon ${className || ''}`} ref={ref} />;
	},
);

export default Icon;
