import { tint } from 'polished';
import { light } from '.';
import tokens from '../tokens';
const colors = tokens.colors;

export default {
	...light,
	colors: {
		...light.colors,

		primaryColor: colors.lochmara,

		textColor: colors.white,
		focusColor: colors.moodyPurple,
		activeColor: colors.scooter,
		backgroundColor: colors.black,

		inputColor: colors.white,
		inputPlaceholderColor: colors.alto,
		inputBackgroundColor: tint(0.1, colors.black),
		inputGroupColor: colors.white,
		inputGroupBackgroundColor: tint(0.3, colors.black),
		inputGroupInteractiveColor: colors.paleCyan,
		inputGroupInteractiveBackgroundColor: tint(0.2, colors.black),
		inputRadioBackgroundColor: tint(0.3, colors.black),
		inputBackgroundReadOnlyColor: tint(0.3, colors.black),
		inputBorderColor: tint(0.1, colors.black),
		inputBorderHoverColor: colors.white,
		inputBorderFocusColor: colors.paleCyan,
		inputBorderDisabledColor: colors.silverChalice,
		inputBorderReadOnlyColor: colors.silverChalice,
	},
	id: 'dark',
};
