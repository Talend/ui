import 'styled-components';

declare module 'styled-components' {
	export type ColorSwatch = {
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
	};
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
			inputDisabledBorderColor: string;
			inputReadOnlyBorderColor: string;
			inputReadOnlyBackgroundColor: string;
			inputPlaceholderColor: string;
			inputRadioBackgroundColor: string;
			inputGroupColor: string;
			inputGroupBackgroundColor: string;
			inputGroupInteractiveColor: string;
			inputGroupInteractiveBackgroundColor: string;

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

			// Tooltips
			tooltipColor: string;
			tooltipBackgroundColor: string;
		};
		id: string;
	}
}
