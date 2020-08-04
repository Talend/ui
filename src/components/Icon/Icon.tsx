import * as React from 'react';
import SVG from 'react-inlinesvg';

import icons from '../../icons';

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

// TODO https://medium.com/@allalmohamedlamine/react-best-way-of-importing-svg-the-how-and-why-f7c968272dd9
export default function Icon({ name, ...rest }: IconProps) {
	if (!Object.keys(icons).find(iconName => iconName === name)) {
		return null;
	}
	return <SVG src={icons[name]} aria-hidden {...rest} />;
}
