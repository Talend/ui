import { create } from '@storybook/theming';
import dictionaryLight from '@talend/design-tokens/lib/light/dictionary';

const t = tokenName => {
	const token = dictionaryLight.find(t => t.name === tokenName);
	if (!token) {
		throw Error('Cannot find token ' + tokenName);
	}
	return token.value;
};

export default create({
	base: 'light',

	colorPrimary: t('coralColorAccentBackground'),
	colorSecondary: t('coralColorAccentBackgroundStrong'),

	// UI
	appBg: t('coralColorNeutralBackgroundMedium'),
	appContentBg: t('coralColorNeutralBackgroundMedium'),
	appBorderColor: 'transparent',
	appBorderRadius: 0,

	// Typography
	fontBase: '"Source Sans Pro", sans-serif',
	fontCode: '"Inconsolata", monospace',

	// Text colors
	textColor: t('coralColorNeutralText'),
	textInverseColor: t('coralColorAssistiveText'),

	// Toolbar default and active colors
	barTextColor: t('coralColorNeutralTextWeak'),
	barSelectedColor: t('coralColorNeutralText'),
	barBg: t('coralColorNeutralBackground'),

	// Form colors
	inputBg: 'white',
	inputBorder: 'silver',
	inputTextColor: 'black',
	inputBorderRadius: 4,
});
