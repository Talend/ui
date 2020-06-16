import { light } from '.';
import tokens from '../tokens';
const colors = tokens.colors;

export default {
	...light,
	colors: {
		...light.colors,
		textColor: colors.white,
		activeColor: colors.scooter,
		backgroundColor: colors.black,
	},
	id: 'dark',
};
