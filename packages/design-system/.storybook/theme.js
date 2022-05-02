import { create } from '@storybook/theming/create';

import dictionaryLight from '@talend/design-tokens/lib/light/dictionary';
import dictionaryDark from '@talend/design-tokens/lib/dark/dictionary';

import logoLight from './logo-light.svg';
import logoDark from './logo-dark.svg';

export default mode => {
	const isDark = mode === 'dark';
	const dictionary = isDark ? dictionaryDark : dictionaryLight;
	const logo = isDark ? logoDark : logoLight;
	const t = tokenName => {
		const token = dictionary.find(t => t.name === tokenName);
		if (!token) {
			throw Error('Cannot find token ' + tokenName);
		}
		return token.value;
	};
	return create({
		base: mode, // 'light',

		colorPrimary: t('coralColorAccentText'), // '#0675C1',
		colorSecondary: t('coralColorAccentTextActive'), // '#19426c',

		// UI
		// appBg: t('coralColorNeutralBackgroundMedium'), // '#f3f3f3',
		// appContentBg: t('coralColorNeutralBackground'), // 'white',
		appBorderColor: t('coralColorNeutralBorderWeak'), // '#C6C6C6',
		appBorderRadius: t('coralRadiusS'), // 4,

		// Typography
		fontBase: '"Source Sans Pro", sans-serif',
		fontCode: '"Inconsolata", monospace',

		// Text colors
		textColor: t('coralColorNeutralText'), // '#202020',
		textInverseColor: t('coralColorNeutralTextInverted'), // 'rgba(255,255,255,0.9)',

		// Toolbar default and active colors
		barTextColor: t('coralColorNeutralText'), // '#555555',
		barSelectedColor: t('coralColorAccentIcon'), // '#202020',
		// barBg: t('coralColorNeutralBackgroundMedium'), // 'white',

		// Form colors
		// inputBg: t('coralColorNeutralBackgroundMedium'), // 'white',
		inputBorder: t('coralColorNeutralBorder'), // 'silver',
		inputTextColor: t('coralColorNeutralText'), // 'black',
		inputBorderRadius: t('coralRadiusS'), // 4,

		brandTitle: 'Coral',
		// brandUrl: '/',
		brandImage: logo,
	});
};
