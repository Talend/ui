import { DefaultTheme } from 'styled-components';

import tokens from '../tokens';

const colors = tokens.colors;

const palette = {
	primaryColor: colors.paleCyan,
	informationColor: colors.lochmara,
	warningColor: colors.jaffa,
	successColor: colors.rioGrande,
	destructiveColor: colors.coral,
	activeColor: colors.paleCyan,
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
		inputBorderColor: palette.grayColor[75],
		inputHoverBorderColor: palette.activeColor[500],
		inputFocusBorderColor: palette.primaryColor[500],
		inputCheckedBorderColor: palette.activeColor[400],
		inputDisabledBorderColor: palette.grayColor[300],
		inputReadOnlyColor: palette.grayColor[75],
		inputReadOnlyBackgroundColor: palette.grayColor[600],
		inputReadOnlyBorderColor: palette.grayColor[600],
		inputPlaceholderColor: palette.grayColor[100],
		inputRadioBackgroundColor: palette.grayColor[600],
		fieldGroupColor: palette.grayColor[0],
		fieldGroupBackgroundColor: palette.grayColor[600],
		fieldGroupInteractiveColor: palette.activeColor[500],
		fieldGroupInteractiveBackgroundColor: palette.activeColor[900],
		fieldGroupInteractiveHoverColor: palette.activeColor[400],
		fieldGroupInteractiveHoverBackgroundColor: palette.activeColor[800],
		fieldGroupInteractiveActiveColor: palette.activeColor[300],
		fieldGroupInteractiveActiveBackgroundColor: palette.activeColor[700],

		linkColor: palette.activeColor[500],
		linkHoverColor: palette.activeColor[400],
		linkActiveColor: palette.activeColor[300],

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

		statusInProgressColor: palette.activeColor[500],
		statusSuccessColor: palette.successColor[400],
		statusFailedColor: palette.destructiveColor[400],
		statusWarningColor: palette.warningColor[400],
		statusCanceledColor: palette.grayColor[300],

		tooltipColor: palette.grayColor[900],
		tooltipBackgroundColor: palette.grayColor[300],
	},
	id: 'dark',
};

export default theme;
