import { tokenValue } from './helper';
// eslint-disable-next-line @talend/import-depth
import dictionaryDark from '@talend/design-tokens/lib/dark/dictionary';

export default {
	base: 'dark',

	colorPrimary: tokenValue(dictionaryDark, 'coralColorAccentBackground'),
	colorSecondary: tokenValue(dictionaryDark, 'coralColorAccentBackgroundStrong'),

	// UI
	appBg: tokenValue(dictionaryDark, 'coralColorNeutralBackgroundMedium'),
	appContentBg: tokenValue(dictionaryDark, 'coralColorNeutralBackground'),
	appBorderColor: 'transparent',
	appBorderRadius: 0,

	// Typography
	fontBase: '"Source Sans Pro", sans-serif',
	fontCode: '"Inconsolata", monospace',

	// Text colors
	textColor: tokenValue(dictionaryDark, 'coralColorNeutralText'),
	textInverseColor: tokenValue(dictionaryDark, 'coralColorAssistiveText'),

	// Toolbar default and active colors
	barTextColor: tokenValue(dictionaryDark, 'coralColorNeutralTextWeak'),
	barSelectedColor: tokenValue(dictionaryDark, 'coralColorNeutralText'),
	barBg: tokenValue(dictionaryDark, 'coralColorNeutralBackground'),

	// Form colors
	// inputBg: 'white',
	inputBorder: tokenValue(dictionaryDark, 'coralColorNeutralBorder'), // 'silver',
	inputTextColor: tokenValue(dictionaryDark, 'coralColorNeutralText'), // 'black',
	inputBorderRadius: tokenValue(dictionaryDark, 'coralRadiusS'), // 4,
};
