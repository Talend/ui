import React from 'react';
import { I18nextProvider } from 'react-i18next';
import { IconsProvider } from '@talend/react-components';
import i18n, { LanguageSwitcher } from './config/i18n';
import { Action, AboutDialog } from '../src';


const props = {
	icon: 'talend-tdp-colored',
};

export default {
	default: () => (
		<div>
			<IconsProvider />
			<Action actionId="show:about" />
			<AboutDialog {...props} />
		</div>
	),
	translated: () => (
		<I18nextProvider i18n={i18n}>
			<div>
				<IconsProvider />
				<LanguageSwitcher />
				<AboutDialog {...props} />
			</div>
		</I18nextProvider>
	),
};
