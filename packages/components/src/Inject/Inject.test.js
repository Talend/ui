import React from 'react';
import { shallow } from 'enzyme';
import { Action } from '../index';

import Inject, { NotFoundComponent } from './Inject.component';

const error = { message: 'MyError' };

describe('Inject', () => {
	it('should render', () => {
		const wrapper = shallow(<Inject />);
		expect(wrapper.getElement()).toMatchSnapshot();
	});
	it('should render an Action component', () => {
		const getComponent = jest.fn(() => Action);
		const props = {
			getComponent,
			component: 'Action',
			label: 'MyLabel',
			icon: 'MyIcon',
		};
		const wrapper = shallow(<Inject {...props} />);
		expect(wrapper.getElement()).toEqual(<Action icon="MyIcon" label="MyLabel" />);
	});
	it('should render NotFoundComponent', () => {
		const getComponent = jest.fn(() => {
			throw error;
		});
		const props = {
			getComponent,
			component: 'Action',
		};
		const wrapper = shallow(<Inject {...props} />);
		expect(wrapper.getElement()).toEqual(<NotFoundComponent error="MyError" />);
	});
	it('should render multiple actions', () => {
		const getComponent = jest.fn(() => Action);
		const array = [
			{ component: 'Action', label: 'LabelAction1', icon: 'IconAction1' },
			{ component: 'Action', label: 'LabelAction2', icon: 'IconAction2' },
		];
		expect(Inject.map(getComponent, array)).toEqual([
			<Inject
				component="Action"
				getComponent={getComponent}
				icon="IconAction1"
				label="LabelAction1"
			/>,
			<Inject
				component="Action"
				getComponent={getComponent}
				icon="IconAction2"
				label="LabelAction2"
			/>,
		]);
	});
});

describe('NotFoundComponent', () => {
	it('should render', () => {
		const wrapper = shallow(<NotFoundComponent error="MyError" />);
		expect(wrapper.getElement()).toEqual(
			<div className="alert alert-danger">MyError</div>,
		);
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
