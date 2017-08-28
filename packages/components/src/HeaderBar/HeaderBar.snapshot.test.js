import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Immutable from 'immutable';

import { HeaderBar } from './HeaderBar.component';

const typeaheadItems = [
	{
		title: 'category 1',
		icon: {
			name: 'talend-filter',
			title: 'icon',
		},
		suggestions: [
			{
				title: 'le title 1',
				description: 'description: Uxoresque est in pacto est marito est hastam nomine in eos discessura incredibile tempus ardore.',
			},
			{
				title: 'title 2 les elephants elementaires ont des aile ',
				description: 'description: Aut aut cum satis inter Epicuri quidem cum erat inquam controversia autem mihi utrumque Attico.',
			},
		],
	},
	{
		title: 'category 2',
		icon: {
			name: 'talend-star',
			title: 'icon',
		},
		suggestions: [
			{
				title: 'title 3',
				description: 'description: In sanciatur libere audeamus exspectemus amicitia et dum ne audeamus causa monendum honesta studium valeat.',
			},
		],
	},
	{
		title: 'category 3',
		icon: {
			name: 'talend-share-alt',
			title: 'icon',
		},
		suggestions: [
			{
				title: 'title 4',
				description: 'description: Praesentibus genero ne in Africani mandavi saepius ipsam C in libro et hoc Laeli cum.',
			},
			{
				title: 'title 5',
				description: 'description: Feceris unde tot illo tot clientes dederis numerando et indiscretus cum paria et unde ubi.',
			},
			{
				title: 'title 6',
				description: 'description: Gradu quos cedentium sunt appeterent ita ancoralia instar luna sunt etiam ubi incendente nihil observabant.',
			},
		],
	},
];

const props = {
	brand: {
		id: 'header-brand',
		name: 'Example App Name',
		onClick: jest.fn(),
	},
	logo: {
		id: 'header-logo',
		onClick: jest.fn(),
	},
	search: {
		icon: {
			name: 'talend-search',
			title: 'icon',
			bsStyle: 'link',
			tooltipPlacement: 'bottom',
		},
		id: 'header-search',
		onToggle: jest.fn(),
	},
	help: {
		id: 'header-help',
		onClick: jest.fn(),
	},
	user: {
		id: 'header-user',
		items: [
			{
				icon: 'talend-cog',
				label: 'Settings',
				onClick: jest.fn(),
			},
		],
		name: 'John Doe',
		firstName: 'John',
		lastName: 'Doe',
	},
	products: {
		id: 'header-products',
		items: [
			{
				icon: 'talend-logo-dp',
				key: 'tdp',
				label: 'Data Preparation',
			},
			{
				icon: 'talend-logo-ic',
				key: 'tic',
				label: 'Integration Cloud',
			},
			{
				icon: 'talend-logo-mc',
				key: 'tmc',
				label: 'Management Console',
			},
		],
		onSelect: jest.fn(),
	},
};

describe('HeaderBar', () => {
	it('should render default HeaderBar', () => {
		// given
		const headerProps = Immutable.fromJS(props).toJS();
		// when
		const wrapper = mount(<HeaderBar {...headerProps} />);

		// then
		expect(toJson(wrapper)).toMatchSnapshot();
	});
	it('shoud render  HeaderBar with full logo', () => {
		// given
		const headerProps = Immutable.fromJS(props).toJS();
		headerProps.logo.isFull = true;

		// when
		const wrapper = mount(<HeaderBar {...headerProps} />);

		// then
		expect(toJson(wrapper)).toMatchSnapshot();
	});

	it('should render HeaderBar with environment dropdown', () => {
		// given
		const headerProps = Immutable.fromJS(props).toJS();
		headerProps.env = {
			id: 'header-environment',
			items: [{
				label: 'Runtime Environment',
				onClick: jest.fn(),
			}],
			label: 'Default',
		};

		// when
		const wrapper = mount(<HeaderBar {...headerProps} />);

		// then
		expect(toJson(wrapper)).toMatchSnapshot();
	});
	it('should render HeaderBAr with help split dropdown', () => {
		// given
		const headerProps = Immutable.fromJS(props).toJS();
		headerProps.help.items = [{
			icon: 'talend-board',
			label: 'Onboarding',
			onClick: jest.fn(),
		}, {
			icon: 'talend-cog',
			label: 'About',
			onClick: jest.fn(),
		}];

		// when
		const wrapper = mount(<HeaderBar {...headerProps} />);

		// then
		expect(toJson(wrapper)).toMatchSnapshot();
	});
	it('should render HeaderBar with search input', () => {
		// given
		const headerProps = Immutable.fromJS(props).toJS();
		headerProps.search = {
			placeholder: 'Search...',
			onBlur: jest.fn(),
			onChange: jest.fn(),
		};

		// when
		const wrapper = mount(<HeaderBar {...headerProps} />);

		// then
		expect(toJson(wrapper)).toMatchSnapshot();
	});
	it('should render HeaderBar while searching', () => {
		const headerProps = Immutable.fromJS(props).toJS();
		headerProps.search = {
			position: 'right',
			value: 'le',
			searching: true,
			onBlur: jest.fn(),
			onChange: jest.fn(),
		};

		// when
		const wrapper = mount(<HeaderBar {...headerProps} />);

		// then
		expect(toJson(wrapper)).toMatchSnapshot();
	});
	it('with search results', () => {
		const headerProps = Immutable.fromJS(props).toJS();
		headerProps.search = {
			position: 'right',
			value: 'le',
			items: typeaheadItems,
			onBlur: jest.fn(),
			onChange: jest.fn(),
			onSelect: jest.fn(),
		};

		// when
		const wrapper = mount(<HeaderBar {...headerProps} />);

		// then
		expect(toJson(wrapper)).toMatchSnapshot();
	});
	it('should render HeaderBar with no search result', () => {
		const headerProps = Immutable.fromJS(props).toJS();
		headerProps.search = {
			position: 'right',
			value: 'le',
			items: [],
			onBlur: jest.fn(),
			onChange: jest.fn(),
		};

		// when
		const wrapper = mount(<HeaderBar {...headerProps} />);

		// then
		expect(toJson(wrapper)).toMatchSnapshot();
	});
});
