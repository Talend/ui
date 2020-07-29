import { DefaultTheme } from 'styled-components';
import { tint } from 'polished';

import tokens from '../tokens';

const colors = tokens.colors;

const theme: DefaultTheme = {
	colors: {
		primaryColor: colors.deepBlue500,
		informationColor: colors.lochmara,
		warningColor: colors.jaffa500,
		successColor: colors.rioGrande500,
		destructiveColor: colors.chesnutRose500,

		textColor: colors.gray900,
		focusColor: colors.moodyPurple,
		activeColor: colors.lochmara,
		backgroundColor: colors.transparent,

		inputColor: colors.gray900,
		inputPlaceholderColor: colors.gray500,
		inputBackgroundColor: colors.gray0,
		inputGroupColor: colors.gray700,
		inputGroupBackgroundColor: colors.gray75,
		inputGroupInteractiveColor: colors.lochmara,
		inputGroupInteractiveBackgroundColor: colors.deepBlue100,
		inputRadioBackgroundColor: colors.gray100,
		inputBackgroundReadOnlyColor: colors.transparent,
		inputBorderColor: colors.gray500,
		inputBorderHoverColor: colors.gray700,
		inputBorderFocusColor: colors.lochmara,
		inputBorderDisabledColor: colors.gray300,
		inputBorderReadOnlyColor: colors.gray300,
	},
	id: 'light',
};

export default theme;
