import React from 'react';
import { shallow } from 'enzyme';
import ButtonsDispatcher from './ButtonsDispatcher';
import ButtonDispatcher from '../ButtonDispatcher';


describe('ButtonsDispatcher', () => {
	let settings;
	let state;
	let context;

	beforeEach(() => {
		settings = require('../mock.settings.json');

		state = {
			cmf: {
				settings,
			},
		};
		context = {
			store: {
				getState() {
					return state;
				},
			},
		};
	});

	const childContextTypes = {
		store: React.PropTypes.object,
	};
	it('should display many ButtonsDispatcher', () => {
		const wrapper = shallow(
			<ButtonsDispatcher contentType="article" category="primary" />,
			{ context, childContextTypes }
		);
		const found = wrapper.find(ButtonDispatcher);
		expect(found.length).toBe(2);
	});
});
