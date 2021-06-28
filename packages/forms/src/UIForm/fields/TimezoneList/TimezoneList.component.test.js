import React from 'react';
import { shallow } from 'enzyme';

import TimezoneList from './TimezoneList.component';

jest.mock('../Datalist', () => {
	return function DataList() { };
});

describe('TimezoneList component', () => {
	afterAll(() => {
		jest.unmock('../Datalist');
	});

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
										Paris: { exemplarCity: 'Paris' },
										Kiev: { exemplarCity: 'Kiev' },
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
		const wrapper = shallow(<TimezoneList {...props} />);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should throw an error if cldr translations are missing', () => {
		// given
		const props = { schema: { lang: 'en' } };

		// when/then
		expect(() => shallow(<TimezoneList {...props} />)).toThrow();
	});
});
