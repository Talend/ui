import { light } from '.';

const colors = light.colors;

export default {
	...light,
	colors: {
		...light.colors,
		textColor: colors.white,
		activeColor: colors.scooter,
		backgroundColor: colors.black,
	},
};
