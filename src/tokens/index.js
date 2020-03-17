import borders from './borders.tokens';
import colors from './colors.tokens';
import opacity from './opacity.tokens';
import sizes from './sizes.tokens';
import spacings from './spacings.tokens';
import typography from './typography.tokens';

export const defaultTheme = {
	borders,
	colors,
	opacity,
	sizes,
	spacings,
	typography,
};

export const darkTheme = {
	...defaultTheme,
	colors: {
		...defaultTheme.colors,
		destructiveColor: 'deeppink',
		inverseColor: colors.white,
	},
};

export default defaultTheme;
