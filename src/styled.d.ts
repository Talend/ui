import 'styled-components';

declare module 'styled-components' {
	export interface ColorSwatch {
		900: string;
		800: string;
		700: string;
		600: string;
		500: string;
		400: string;
		300: string;
		200: string;
		100: string;
		75?: string;
		50?: string;
		0?: string;
	}
	export interface DefaultTheme {
		colors: {
			// Palette
			primaryColor: ColorSwatch;
			informationColor: ColorSwatch;
			warningColor: ColorSwatch;
			successColor: ColorSwatch;
			destructiveColor: ColorSwatch;
			focusColor: ColorSwatch;
			activeColor: ColorSwatch;
			grayColor: ColorSwatch;

			// Global
			textColor: string;
			backgroundColor: string;

			// Accordions
			accordionBorderColor: string;
			accordionBackgroundColor: string;

			// Buttons
			buttonPrimaryColor: string;
			buttonPrimaryBackgroundColor: string;
			buttonPrimaryHoverBackgroundColor: string;
			buttonPrimaryActiveBackgroundColor: string;

			buttonDestructiveBackgroundColor: string;
			buttonDestructiveHoverBackgroundColor: string;
			buttonDestructiveActiveBackgroundColor: string;

			buttonSecondaryBackgroundColor: string;
			buttonSecondaryHoverBackgroundColor: string;
			buttonSecondaryActiveBackgroundColor: string;

			buttonDisabledColor: string;
			buttonDisabledBackgroundColor: string;

			// Inputs
			inputColor: string;
			inputBackgroundColor: string;
			inputBorderColor: string;
			inputHoverBorderColor: string;
			inputFocusBorderColor: string;
			inputCheckedBorderColor: string;
			inputDisabledBorderColor: string;
			inputReadOnlyColor: string;
			inputReadOnlyBackgroundColor: string;
			inputReadOnlyBorderColor: string;
			inputPlaceholderColor: string;
			inputRadioBackgroundColor: string;
			fieldGroupColor: string;
			fieldGroupBackgroundColor: string;
			fieldGroupInteractiveColor: string;
			fieldGroupInteractiveBackgroundColor: string;
			fieldGroupInteractiveHoverColor: string;
			fieldGroupInteractiveHoverBackgroundColor: string;
			fieldGroupInteractiveActiveColor: string;
			fieldGroupInteractiveActiveBackgroundColor: string;

			// Links
			linkColor: string;
			linkHoverColor: string;
			linkActiveColor: string;

			// Modals
			modalBackground: string;
			modalHeadingBackground: string;
			modalHeadingBorderColor: string;

			// Skeletons
			skeletonBackgroundColor: string;

			// Tags
			tagDefaultColor: string;
			tagDefaultBackgroundColor: string;
			tagInformationColor: string;
			tagInformationBackgroundColor: string;
			tagSuccessColor: string;
			tagSuccessBackgroundColor: string;
			tagDestructiveColor: string;
			tagDestructiveBackgroundColor: string;
			tagWarningColor: string;
			tagWarningBackgroundColor: string;

			// Status
			statusInProgressColor: string;
			statusSuccessColor: string;
			statusFailedColor: string;
			statusWarningColor: string;
			statusCanceledColor: string;

			// Tooltips
			tooltipColor: string;
			tooltipBackgroundColor: string;
		};
		id: string;
	}
}
