import { render, screen } from '@testing-library/react';
import i18next from 'i18next';
import { I18nextProvider, Trans, useTranslation, withTranslation } from 'react-i18next';
import { describe, expect, it, vi } from 'vitest';

// vitest.setup.ts mocks react-i18next globally; use the real implementation here.
vi.unmock('react-i18next');
vi.unmock('i18next');

async function makeI18n(resources: Record<string, unknown> = {}) {
	const instance = i18next.createInstance();
	await instance.init({
		lng: 'en',
		fallbackLng: 'en',
		resources: { en: { translation: resources } },
		interpolation: { escapeValue: false },
	});
	return instance;
}

function Hook() {
	const { t } = useTranslation();
	return (
		<>
			<span>{t('hello', { name: 'Bob', defaultValue: 'Hi {{name}}' })}</span>
			<span>
				{t('count', {
					count: 2,
					defaultValue: '{{count}} item',
					defaultValue_other: '{{count}} items',
				})}
			</span>
		</>
	);
}

const Wrapped = withTranslation()(({ t }: { t: (k: string, o?: object) => string }) => (
	<span>{t('wrapped', { defaultValue: 'Wrapped default' })}</span>
));

describe('real react-i18next integration', () => {
	it('useTranslation uses resources and defaultValue/plural', async () => {
		const i18n = await makeI18n({ hello: 'Hello {{name}}' });
		render(
			<I18nextProvider i18n={i18n}>
				<Hook />
			</I18nextProvider>,
		);
		expect(screen.getByText('Hello Bob')).toBeVisible();
		expect(screen.getByText('2 items')).toBeVisible();
	});

	it('withTranslation injects t', async () => {
		const i18n = await makeI18n();
		render(
			<I18nextProvider i18n={i18n}>
				<Wrapped />
			</I18nextProvider>,
		);
		expect(screen.getByText('Wrapped default')).toBeVisible();
	});

	it('Trans renders components in translation', async () => {
		const i18n = await makeI18n({ rich: 'Click <1>here</1>' });
		render(
			<I18nextProvider i18n={i18n}>
				<Trans i18nKey="rich" components={{ 1: <a href="#x" /> }} />
			</I18nextProvider>,
		);
		expect(screen.getByRole('link', { name: 'here' })).toBeVisible();
	});
});
