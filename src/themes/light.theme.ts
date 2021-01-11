import { DefaultTheme } from 'styled-components';

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
		inputBackgroundColor: colors.gray0,
		inputBorderColor: colors.gray500,
		inputHoverBorderColor: colors.gray700,
		inputFocusBorderColor: colors.lochmara,
		inputDisabledBorderColor: colors.gray300,
		inputReadOnlyBorderColor: colors.gray50,
		inputReadOnlyBackgroundColor: colors.gray50,
		inputPlaceholderColor: colors.gray500,
		inputRadioBackgroundColor: colors.gray100,
		inputGroupColor: colors.gray700,
		inputGroupBackgroundColor: colors.gray75,
		inputGroupInteractiveColor: colors.deepBlue500,
		inputGroupInteractiveBackgroundColor: colors.lochmara100,

		modalBackground: colors.gray50,
		modalHeadingBackground: colors.gray0,
		modalHeadingBorderColor: colors.gray75,

		skeletonBackgroundColor: colors.gray100,

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
		tooltipBackgroundColor: colors.gray900,
	},
	id: 'light',
};

export default theme;
