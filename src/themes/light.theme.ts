import { DefaultTheme } from 'styled-components';

import tokens from '../tokens';

const colors = tokens.colors;

const palette = {
	primaryColor: colors.deepBlue,
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

		textColor: palette.grayColor[900],
		backgroundColor: palette.grayColor[0],

		accordionBorderColor: palette.grayColor[100],
		accordionBackgroundColor: palette.grayColor[50],

		buttonPrimaryColor: palette.grayColor[0],
		buttonPrimaryBackgroundColor: palette.primaryColor[500],
		buttonPrimaryHoverBackgroundColor: palette.primaryColor[600],
		buttonPrimaryActiveBackgroundColor: palette.primaryColor[700],

		buttonDestructiveBackgroundColor: palette.destructiveColor[600],
		buttonDestructiveHoverBackgroundColor: palette.destructiveColor[700],
		buttonDestructiveActiveBackgroundColor: palette.destructiveColor[800],

		buttonSecondaryBackgroundColor: colors.transparent,
		buttonSecondaryHoverBackgroundColor: palette.informationColor[100],
		buttonSecondaryActiveBackgroundColor: palette.informationColor[200],

		buttonDisabledColor: palette.grayColor[600],
		buttonDisabledBackgroundColor: palette.grayColor[100],

		inputColor: palette.grayColor[900],
		inputBackgroundColor: palette.grayColor[0],
		inputBorderColor: palette.grayColor[500],
		inputHoverBorderColor: palette.grayColor[900],
		inputFocusBorderColor: palette.activeColor[500],
		inputCheckedBorderColor: palette.activeColor[600],
		inputDisabledBorderColor: palette.grayColor[300],
		inputReadOnlyColor: palette.grayColor[600],
		inputReadOnlyBackgroundColor: palette.grayColor[50],
		inputReadOnlyBorderColor: 'transparent',
		inputPlaceholderColor: palette.grayColor[500],
		inputRadioBackgroundColor: palette.grayColor[100],
		inputGroupColor: palette.grayColor[700],
		inputGroupBackgroundColor: palette.grayColor[75],
		inputGroupInteractiveColor: palette.activeColor[600],
		inputGroupInteractiveBackgroundColor: colors.paleCyan[100],
		inputGroupInteractiveHoverColor: palette.activeColor[700],
		inputGroupInteractiveHoverBackgroundColor: colors.paleCyan[200],
		inputGroupInteractiveActiveColor: palette.activeColor[800],
		inputGroupInteractiveActiveBackgroundColor: colors.paleCyan[300],

		linkColor: palette.activeColor[500],
		linkHoverColor: palette.activeColor[600],
		linkActiveColor: palette.activeColor[700],

		modalBackground: palette.grayColor[50],
		modalHeadingBackground: palette.grayColor[0],
		modalHeadingBorderColor: palette.grayColor[75],

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

		tooltipColor: palette.grayColor[0],
		tooltipBackgroundColor: palette.grayColor[900],
	},
	id: 'light',
};

export default theme;
