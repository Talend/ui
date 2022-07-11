import { tokenValue } from './helper';
// eslint-disable-next-line @talend/import-depth
import dictionaryLight from '@talend/design-tokens/lib/light/dictionary';

export default {
	base: 'light',

	colorPrimary: tokenValue(dictionaryLight, 'coralColorAccentBackground'),
	colorSecondary: tokenValue(dictionaryLight, 'coralColorAccentBackgroundStrong'),

	// UI
	appBg: tokenValue(dictionaryLight, 'coralColorNeutralBackgroundMedium'),
	appContentBg: tokenValue(dictionaryLight, 'coralColorNeutralBackground'),
	appBorderColor: 'transparent',
	appBorderRadius: 0,

	// Typography
	fontBase: '"Source Sans Pro", sans-serif',
	fontCode: '"Inconsolata", monospace',

	// Text colors
	textColor: tokenValue(dictionaryLight, 'coralColorNeutralText'),
	textInverseColor: tokenValue(dictionaryLight, 'coralColorAssistiveText'),

	// Toolbar default and active colors
	barTextColor: tokenValue(dictionaryLight, 'coralColorNeutralTextWeak'),
	barSelectedColor: tokenValue(dictionaryLight, 'coralColorNeutralText'),
	barBg: tokenValue(dictionaryLight, 'coralColorNeutralBackground'),

	// Form colors
	// inputBg: 'white',
	inputBorder: tokenValue(dictionaryLight, 'coralColorNeutralBorder'), // 'silver',
	inputTextColor: tokenValue(dictionaryLight, 'coralColorNeutralText'), // 'black',
	inputBorderRadius: tokenValue(dictionaryLight, 'coralRadiusS'), // 4,
};
