import 'styled-components';

declare module 'styled-components' {
	export interface DefaultTheme {
		colors: {
			//
			primaryColor: string;
			informationColor: string;
			warningColor: string;
			successColor: string;
			destructiveColor: string;
			//
			textColor: string;
			focusColor: string;
			activeColor: string;
			backgroundColor: string;
			// Buttons
			buttonPrimaryColor: string; // $gray0
			buttonPrimaryBackgroundColor: string; // $deepBlue500
			buttonPrimaryHoverBackgroundColor: string; // $deepBlue600
			buttonPrimaryActiveBackgroundColor: string; // $deepBlue700

			buttonDestructiveBackgroundColor: string; // $coral600
			buttonDestructiveHoverBackgroundColor: string; // $coral700
			buttonDestructiveActiveBackgroundColor: string; // $coral800

			buttonSecondaryBackgroundColor: string; // $transparent | $gray0
			buttonSecondaryHoverBackgroundColor: string; // $deepBlue100
			buttonSecondaryActiveBackgroundColor: string; // $deepBlue100

			buttonDisabledColor: string; // $gray600
			buttonDisabledBackgroundColor: string; // $gray100

			// Inputs
			inputColor: string;
			inputPlaceholderColor: string;
			inputBackgroundColor: string;
			inputGroupColor: string;
			inputGroupBackgroundColor: string;
			inputGroupInteractiveColor: string;
			inputGroupInteractiveBackgroundColor: string;
			inputRadioBackgroundColor: string;
			inputBackgroundReadOnlyColor: string;
			inputBorderColor: string;
			inputBorderHoverColor: string;
			inputBorderFocusColor: string;
			inputBorderDisabledColor: string;
			inputBorderReadOnlyColor: string;
		};
		id: string;
	}
}
