import { DefaultTheme } from 'styled-components';

import tokens from '../tokens';

const colors = tokens.colors;

const theme: DefaultTheme = {
	colors: {
		primaryColor: colors.paleCyan,
		informationColor: colors.lochmara,
		warningColor: colors.jaffa500,
		successColor: colors.rioGrande500,
		destructiveColor: colors.coral600,

		textColor: colors.gray0,
		focusColor: colors.moodyPurple,
		activeColor: colors.paleCyan,
		backgroundColor: colors.gray900,

		buttonPrimaryColor: colors.gray900,
		buttonPrimaryBackgroundColor: colors.paleCyan500,
		buttonPrimaryHoverBackgroundColor: colors.paleCyan400,
		buttonPrimaryActiveBackgroundColor: colors.paleCyan300,

		buttonDestructiveBackgroundColor: colors.coral400,
		buttonDestructiveHoverBackgroundColor: colors.coral300,
		buttonDestructiveActiveBackgroundColor: colors.coral200,

		buttonSecondaryBackgroundColor: colors.transparent,
		buttonSecondaryHoverBackgroundColor: colors.paleCyan900,
		buttonSecondaryActiveBackgroundColor: colors.paleCyan900,

		buttonDisabledColor: colors.gray100,
		buttonDisabledBackgroundColor: colors.gray600,

		inputColor: colors.gray0,
		inputPlaceholderColor: colors.gray100,
		inputBackgroundColor: colors.gray800,
		inputGroupColor: colors.gray0,
		inputGroupBackgroundColor: colors.gray600,
		inputGroupInteractiveColor: colors.paleCyan,
		inputGroupInteractiveBackgroundColor: colors.gray700,
		inputRadioBackgroundColor: colors.gray600,
		inputBackgroundReadOnlyColor: colors.gray600,
		inputBorderColor: colors.gray800,
		inputBorderHoverColor: colors.gray0,
		inputBorderFocusColor: colors.paleCyan,
		inputBorderDisabledColor: colors.gray300,
		inputBorderReadOnlyColor: colors.gray300,

		modalBackground: colors.gray700,
		modalHeadingBackground: colors.gray800,
		modalHeadingBorderColor: colors.gray900,

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

		tooltipColor: colors.gray900,
		tooltipBackgroundColor: colors.gray300,
	},
	id: 'dark',
};

export default theme;
