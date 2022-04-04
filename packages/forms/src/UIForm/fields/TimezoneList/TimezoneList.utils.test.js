import { getTimezones } from './TimezoneList.utils';

describe('getTimezones', () => {
	const cldrTimezones = {
		en: {
			main: {
				en: {
					dates: {
						timeZoneNames: {
							zone: {
								Africa: {
									Abidjan: { exemplarCity: '[EN] Abidjan' },
									Freetown: { exemplarCity: '[EN] Freetown' },
								},
								Europe: {
									Istanbul: { exemplarCity: '[EN] Istanbul' },
								},
							},
						},
					},
				},
			},
		},
		fr: {
			main: {
				fr: {
					dates: {
						timeZoneNames: {
							zone: {
								Africa: {
									Abidjan: { exemplarCity: '[FR] Abidjan' },
									Freetown: { exemplarCity: '[FR] Freetown' },
								},
								Europe: {
									Istanbul: { exemplarCity: '[FR] Istanbul' },
								},
							},
						},
					},
				},
			},
		},
	};

	it('should return the list of timezones ready to be used by the DataList', () => {
		// when
		const timezones = getTimezones('fr', cldrTimezones);

		// then
		expect(timezones).toEqual([
			{
				name: '(UTC +00:00) [FR] Abidjan',
				timezoneName: '[FR] Abidjan',
				offset: 0,
				value: 'Africa/Abidjan',
			},
			{
				name: '(UTC +00:00) [FR] Freetown',
				timezoneName: '[FR] Freetown',
				offset: 0,
				value: 'Africa/Freetown',
			},
			{
				name: '(UTC +03:00) [FR] Istanbul',
				timezoneName: '[FR] Istanbul',
				offset: 180,
				value: 'Europe/Istanbul',
			},
		]);
	});

	it('should fallback to English language if specified language has no translation provided', () => {
		// when
		const timezones = getTimezones('es', cldrTimezones);

		// then
		expect(timezones).toEqual([
			{
				name: '(UTC +00:00) [EN] Abidjan',
				timezoneName: '[EN] Abidjan',
				offset: 0,
				value: 'Africa/Abidjan',
			},
			{
				name: '(UTC +00:00) [EN] Freetown',
				timezoneName: '[EN] Freetown',
				offset: 0,
				value: 'Africa/Freetown',
			},
			{
				name: '(UTC +03:00) [EN] Istanbul',
				timezoneName: '[EN] Istanbul',
				offset: 180,
				value: 'Europe/Istanbul',
			},
		]);
	});

	it('should throw an error when no translation is available', () => {
		expect(() => getTimezones('es', {})).toThrow();
	});
});
