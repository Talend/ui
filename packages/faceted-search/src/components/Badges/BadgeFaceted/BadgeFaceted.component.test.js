/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { mount } from 'enzyme';
import { BadgeFaceted } from './BadgeFaceted.component';
import { BadgeFacetedProvider } from '../../context/badgeFaceted.context';

// eslint-disable-next-line react/prop-types
const MyWrappedBadge = ({ children, properties, providerValue }) => (
	<BadgeFacetedProvider value={providerValue}>
		<BadgeFaceted {...properties}>{children}</BadgeFaceted>
	</BadgeFacetedProvider>
);

// eslint-disable-next-line react/prop-types
const TestChildren = ({ badgeValue = 'default', onChangeValue, onSubmit }) => (
	<button id="my-button" onChange={onChangeValue} onClick={onSubmit}>
		{badgeValue}
	</button>
);

describe('BadgeFaceted', () => {
	const operators = [
		{
			name: 'operatorIconEqual',
			label: 'My icon operator equal',
			iconName: 'talend-my-icon-equal',
		},
		{
			name: 'operatorIconNotEqual',
			label: 'My icon operator not equal',
			iconName: 'talend-my-icon-not-equal',
		},
	];
	const operator = operators[0];
	it('should render the html output by default', () => {
		// Given
		const badgeFacetedContextValue = {
			state: { badges: [] },
			dispatch: jest.fn(),
			onSubmit: jest.fn(),
		};
		const props = {
			id: 'my-id',
			badgeId: 'my-badge-id',
			category: 'Category',
			labelCategory: 'My Label',
			labelValue: 'All',
			operator,
			operators,
			t: () => 'Remove filter',
		};
		// When
		const wrapper = mount(
			<MyWrappedBadge properties={props} providerValue={badgeFacetedContextValue}>
				{renderProps => <TestChildren {...renderProps} />}
			</MyWrappedBadge>,
		);
		// Then
		expect(wrapper.find('div#tc-badge-select-my-id')).toHaveLength(1);
		expect(wrapper.html()).toMatchSnapshot();
	});
	it('should trigger the onSubmit callback from context when children is clicked', () => {
		// Given
		const onSubmit = jest.fn();
		const badgeFacetedContextValue = {
			onDeleteBadge: jest.fn(),
			dispatch: jest.fn(),
			onSubmit,
		};
		const props = {
			badgeId: 'my-badge-id',
			category: 'Category',
			id: 'my-id',
			labelCategory: 'My Label',
			labelValue: 'All',
			operator,
			operators,
			t: () => 'Remove filter',
			value: 'hello world',
		};
		// When
		const wrapper = mount(
			<MyWrappedBadge properties={props} providerValue={badgeFacetedContextValue}>
				{renderProps => <TestChildren {...renderProps} />}
			</MyWrappedBadge>,
		).renderProp('children')({ onSubmit });
		wrapper.find('button#my-button').simulate('click');
		// Then
		expect(onSubmit).toHaveBeenCalledTimes(1);
	});
	it('should trigger the onDelete callback from context when cross button is clicked', () => {
		// Given
		const dispatch = jest.fn();
		const badgeFacetedContextValue = {
			state: { badges: [] },
			dispatch,
			onSubmit: jest.fn(),
		};
		const props = {
			badgeId: 'my-badge-id',
			category: 'Category',
			id: 'my-id',
			labelCategory: 'My Label',
			labelValue: 'All',
			operator,
			operators,
			t: () => 'Remove filter',
			value: 'hello world',
		};
		// When
		const wrapper = mount(
			<MyWrappedBadge properties={props} providerValue={badgeFacetedContextValue}>
				{renderProps => <TestChildren {...renderProps} />}
			</MyWrappedBadge>,
		);
		wrapper.find('button#tc-badge-delete-my-id').simulate('click');
		// Then
		expect(dispatch).toHaveBeenNthCalledWith(1, {
			payload: { badgeId: 'my-badge-id' },
			type: 'DELETE_BADGE',
		});
	});
});
