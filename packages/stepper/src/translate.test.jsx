import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import i18next from 'i18next';
import { I18nextProvider, setI18n } from 'react-i18next';
import { useTranslation } from 'react-i18next';

import getDefaultT from './translate';

function Label() {
	const { t } = useTranslation();
	return <span>{t('label', { defaultValue: 'Default {{x}}', x: 'X' })}</span>;
}

describe('stepper translate', () => {
	it('should translate defaultValue with the registered i18n host', async () => {
		const instance = i18next.createInstance();
		await instance.init({ lng: 'en', resources: { en: { translation: {} } } });
		setI18n(instance);
		expect(getDefaultT()('label', { defaultValue: 'Hello {{n}}', n: 1 })).toBe('Hello 1');
	});

	it('should render translated text through a provider', async () => {
		const instance = i18next.createInstance();
		await instance.init({
			lng: 'en',
			resources: { en: { translation: { label: 'Translated' } } },
		});
		render(
			<I18nextProvider i18n={instance}>
				<Label />
			</I18nextProvider>,
		);
		expect(screen.getByText('Translated')).toBeTruthy();
	});

	it('should render defaultValue when key missing', async () => {
		const instance = i18next.createInstance();
		await instance.init({ lng: 'en', resources: { en: { translation: {} } } });
		render(
			<I18nextProvider i18n={instance}>
				<Label />
			</I18nextProvider>,
		);
		expect(screen.getByText('Default X')).toBeTruthy();
	});
});
