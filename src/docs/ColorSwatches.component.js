import React from 'react';
import { ColorPalette, ColorItem } from '@storybook/components';

function ColorSwatches({ color, colors, title, subtitle, ...rest }) {
	return (
		<ColorPalette {...rest}>
			<ColorItem
				title={title || color}
				subtitle={subtitle}
				colors={Object.fromEntries(
					Object.entries(colors)
						.filter(([key, value]) => key.startsWith(color))
						.map(([key, value]) => [key.replace(color, ''), value]),
				)}
			/>
		</ColorPalette>
	);
}

export default ColorSwatches;
