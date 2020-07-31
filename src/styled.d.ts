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
