import { DefaultTheme } from 'styled-components';

import tokens from '../tokens';

const colors = tokens.colors;

const palette = {
	primaryColor: colors.paleCyan,
	informationColor: colors.lochmara,
	warningColor: colors.jaffa,
	successColor: colors.rioGrande,
	destructiveColor: colors.coral,
	activeColor: colors.lochmara,
	focusColor: colors.moodyPurple,
	grayColor: colors.gray,
};

const theme: DefaultTheme = {
	colors: {
		...palette,

		textColor: palette.grayColor[0],
		backgroundColor: colors.indigoGray[500],

		accordionBorderColor: palette.grayColor[800],
		accordionBackgroundColor: palette.grayColor[700],

		buttonPrimaryColor: palette.grayColor[900],
		buttonPrimaryBackgroundColor: palette.primaryColor[500],
		buttonPrimaryHoverBackgroundColor: palette.primaryColor[400],
		buttonPrimaryActiveBackgroundColor: palette.primaryColor[300],

		buttonDestructiveBackgroundColor: palette.destructiveColor[400],
		buttonDestructiveHoverBackgroundColor: palette.destructiveColor[300],
		buttonDestructiveActiveBackgroundColor: palette.destructiveColor[200],

		buttonSecondaryBackgroundColor: colors.transparent,
		buttonSecondaryHoverBackgroundColor: palette.primaryColor[900],
		buttonSecondaryActiveBackgroundColor: palette.primaryColor[900],

		buttonDisabledColor: palette.grayColor[100],
		buttonDisabledBackgroundColor: palette.grayColor[600],

		inputColor: palette.grayColor[0],
		inputBackgroundColor: palette.grayColor[800],
		inputBorderColor: palette.grayColor[800],
		inputHoverBorderColor: palette.grayColor[0],
		inputFocusBorderColor: palette.primaryColor[500],
		inputDisabledBorderColor: palette.grayColor[300],
		inputReadOnlyBorderColor: palette.grayColor[600],
		inputReadOnlyBackgroundColor: palette.grayColor[600],
		inputPlaceholderColor: palette.grayColor[100],
		inputRadioBackgroundColor: palette.grayColor[600],
		inputGroupColor: palette.grayColor[0],
		inputGroupBackgroundColor: palette.grayColor[600],
		inputGroupInteractiveColor: palette.primaryColor[500],
		inputGroupInteractiveBackgroundColor: palette.grayColor[700],

		linkColor: palette.activeColor[500],
		linkHoverColor: palette.activeColor[600],
		linkActiveColor: palette.activeColor[700],

		modalBackground: palette.grayColor[700],
		modalHeadingBackground: palette.grayColor[800],
		modalHeadingBorderColor: palette.grayColor[900],

		skeletonBackgroundColor: palette.grayColor[100],

		tagDefaultColor: palette.grayColor[700],
		tagDefaultBackgroundColor: palette.grayColor[75],
		tagInformationColor: palette.informationColor[700],
		tagInformationBackgroundColor: palette.informationColor[100],
		tagSuccessColor: palette.successColor[700],
		tagSuccessBackgroundColor: palette.successColor[100],
		tagDestructiveColor: palette.destructiveColor[700],
		tagDestructiveBackgroundColor: palette.destructiveColor[100],
		tagWarningColor: palette.warningColor[700],
		tagWarningBackgroundColor: palette.warningColor[100],

		tooltipColor: palette.grayColor[900],
		tooltipBackgroundColor: palette.grayColor[300],
	},
	id: 'dark',
};

export default theme;
