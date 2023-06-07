// Keep this file to manage custom types for i18next and don't have issue with aria-label (null value not managed)
import 'i18next';

declare module 'i18next' {
	interface CustomTypeOptions {
		returnNull: false;
	}
}
