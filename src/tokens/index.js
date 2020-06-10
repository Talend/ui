import borders from './borders.tokens';
import colors from './colors.tokens';
import opacity from './opacity.tokens';
import sizes from './sizes.tokens';
import spacings from './space.tokens';
import typography from './fonts.tokens';

export const defaultTheme = {
	borders,
	colors: {
		...colors,
		textColor: colors.black,
		activeColor: colors.lochmara,
		backgroundColor: colors.transparent,

		inputBorderColor: colors.silverChalice,
		inputBorderHoverColor: colors.doveGray,
		inputBorderFocusColor: colors.lochmara,
		inputBorderDisabledColor: '#AAA',
		inputBorderReadOnlyColor: colors.silverChalice,
	},
	opacity,
	sizes,
	spacings,
	typography,
};

export const darkTheme = {
	...defaultTheme,
	colors: {
		...defaultTheme.colors,
		textColor: colors.white,
		activeColor: colors.scooter,
		backgroundColor: colors.black,
	},
};

export default defaultTheme;
