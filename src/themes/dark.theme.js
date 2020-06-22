import { light } from '.';
import tokens from '../tokens';
const colors = tokens.colors;

export default {
	...light,
	colors: {
		...light.colors,

		textColor: colors.white,
		focusColor: colors.coral,
		activeColor: colors.scooter,
		backgroundColor: colors.black,

		inputColor: colors.white,
		inputPlaceholderColor: colors.alto,
		inputBackgroundColor: colors.black,
		inputRadioBackgroundColor: colors.darkSilver,
		inputBackgroundReadOnlyColor: colors.transparent,
		inputBorderColor: colors.alto,
		inputBorderHoverColor: colors.white,
		inputBorderFocusColor: colors.alto,
		inputBorderDisabledColor: colors.silverChalice,
		inputBorderReadOnlyColor: colors.silverChalice,
	},
	id: 'dark',
};
