import borders from './borders.tokens';
import borderStyles from './borderStyles.tokens';
import borderWidths from './borderWidths.tokens';
import colors from './colors.tokens';
import fonts from './fonts.tokens';
import fontSizes from './fontSizes.tokens';
import fontWeights from './fontWeights.tokens';
import letterSpacings from './letterSpacings.tokens';
import lineHeights from './lineHeights.tokens';
import opacity from './opacity.tokens';
import radii from './radii.tokens';
import shadows from './shadows.tokens';
import sizes from './sizes.tokens';
import space from './space.tokens';
import transitions from './transitions.tokens';
import zIndices from './zIndices.tokens';

export const tokens = {
	borders,
	borderStyles,
	borderWidths,
	colors,
	fonts,
	fontSizes,
	fontWeights,
	letterSpacings,
	lineHeights,
	opacity,
	radii,
	shadows,
	sizes,
	space,
	transitions,
	zIndices,
};

export const defaultTheme = {
	...tokens,
	colors: {
		...tokens.colors,
		textColor: colors.black,
		activeColor: colors.lochmara,
		backgroundColor: colors.transparent,

		inputBorderColor: colors.silverChalice,
		inputBorderHoverColor: colors.doveGray,
		inputBorderFocusColor: colors.lochmara,
		inputBorderDisabledColor: '#AAA',
		inputBorderReadOnlyColor: colors.silverChalice,
	},
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
