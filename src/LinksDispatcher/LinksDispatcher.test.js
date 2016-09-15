import React from 'react';
import { shallow } from 'enzyme';
import LinksDispatcher from './LinksDispatcher';
import LinkDispatcher from '../LinkDispatcher';

describe('LinksDispatcher', () => {
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
	it('should display many LinksDispatcher', () => {
		const wrapper = shallow(
			<LinksDispatcher contentType="article" category="primary" />,
			{ context, childContextTypes }
		);
		const found = wrapper.find(LinkDispatcher);
		expect(found.length).toBe(2);
	});
});
