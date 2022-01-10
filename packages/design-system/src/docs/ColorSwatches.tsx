import React from 'react';
import { ColorPalette, ColorItem } from '@storybook/components';

function ColorSwatches({
	color,
	colors,
	title,
	subtitle,
	...rest
}: React.PropsWithChildren<any> & {
	colors: { [key: string]: string };
	color: string;
	title: string;
	subtitle: string;
}) {
	return (
		<ColorPalette {...rest}>
			<ColorItem title={title || color} subtitle={subtitle} colors={colors[color] || {}} />
		</ColorPalette>
	);
}

export default ColorSwatches;
