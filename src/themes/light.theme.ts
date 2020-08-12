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
		destructiveColor: colors.coral600,

		textColor: colors.gray900,
		focusColor: colors.moodyPurple,
		activeColor: colors.lochmara,
		backgroundColor: colors.gray0,

		buttonPrimaryColor: colors.gray0,
		buttonPrimaryBackgroundColor: colors.deepBlue500,
		buttonPrimaryHoverBackgroundColor: colors.deepBlue600,
		buttonPrimaryActiveBackgroundColor: colors.deepBlue700,

		buttonDestructiveBackgroundColor: colors.coral600,
		buttonDestructiveHoverBackgroundColor: colors.coral700,
		buttonDestructiveActiveBackgroundColor: colors.coral800,

		buttonSecondaryBackgroundColor: colors.transparent,
		buttonSecondaryHoverBackgroundColor: colors.lochmara100,
		buttonSecondaryActiveBackgroundColor: colors.lochmara200,

		buttonDisabledColor: colors.gray600,
		buttonDisabledBackgroundColor: colors.gray100,

		inputColor: colors.gray900,
		inputPlaceholderColor: colors.gray500,
		inputBackgroundColor: colors.gray0,
		inputGroupColor: colors.gray700,
		inputGroupBackgroundColor: colors.gray75,
		inputGroupInteractiveColor: colors.deepBlue500,
		inputGroupInteractiveBackgroundColor: colors.lochmara100,
		inputRadioBackgroundColor: colors.gray100,
		inputBackgroundReadOnlyColor: colors.transparent,
		inputBorderColor: colors.gray500,
		inputBorderHoverColor: colors.gray700,
		inputBorderFocusColor: colors.lochmara,
		inputBorderDisabledColor: colors.gray300,
		inputBorderReadOnlyColor: colors.gray300,

		tagDefaultColor: colors.gray700,
		tagDefaultBackgroundColor: colors.gray75,
		tagInformationColor: colors.lochmara700,
		tagInformationBackgroundColor: colors.lochmara100,
		tagSuccessColor: colors.rioGrande700,
		tagSuccessBackgroundColor: colors.rioGrande100,
		tagDestructiveColor: colors.coral700,
		tagDestructiveBackgroundColor: colors.coral100,
		tagWarningColor: colors.jaffa700,
		tagWarningBackgroundColor: colors.jaffa100,

		tooltipColor: colors.gray0,
		tooltipBackgroundColor: colors.gray700,
	},
	id: 'light',
};

export default theme;
