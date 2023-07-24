import { render } from '@testing-library/react';

import TimezoneList from './TimezoneList.component';

jest.mock('../Datalist', () => {
	return function DataList(props) {
		return <div data-testid="datalist" data-props={JSON.stringify(props, null, 2)} />;
	};
});

describe('TimezoneList component', () => {
	it('should render the timezone dropdown widget', () => {
		// given
		const lang = 'fr';

		const cldrTimezones = {
			[lang]: {
				main: {
					fr: {
						dates: {
							timeZoneNames: {
								zone: {
									Africa: {
										Abidjan: { exemplarCity: 'Abidjan' },
										Freetown: { exemplarCity: 'Freetown' },
									},
									Europe: {
										Istanbul: { exemplarCity: 'Istanbul' },
									},
								},
							},
						},
					},
				},
			},
		};

		const props = { schema: { lang, cldrTimezones } };

		// when
		const { container } = render(<TimezoneList {...props} />);

		// then
		expect(container.firstChild).toMatchSnapshot();
	});

	it('should throw an error if cldr translations are missing', () => {
		// given
		jest.spyOn(console, 'error').mockImplementation(() => {});
		const props = { schema: { lang: 'en' } };

		// when/then
		expect(() => render(<TimezoneList {...props} />)).toThrow();
	});
});
