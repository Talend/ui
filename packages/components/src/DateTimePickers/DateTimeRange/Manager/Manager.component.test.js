import React from 'react';
import { shallow, mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import cases from 'jest-in-case';

import Manager from './Manager.component';
import { DateTimeRangeContext } from '../Context';

const DEFAULT_ID = 'DEFAULT_ID';

function DateTimeRangeConsumerDiv() {
	return <div />;
}
// eslint-disable-next-line react/prop-types
function DateTimeRangeConsumer() {
	return (
		<DateTimeRangeContext.Consumer>
			{contextValue => <DateTimeRangeConsumerDiv {...contextValue} />}
		</DateTimeRangeContext.Consumer>
	);
}

describe('DateTime.Manager', () => {
	it('should render its children', () => {
		// when
		const wrapper = shallow(
			<Manager
				id={DEFAULT_ID}
				startDateTime={new Date(2017, 3, 4, 15, 27)}
				endDateTime={new Date(2017, 3, 10, 15, 27)}
			>
				<DateTimeRangeConsumer />
			</Manager>,
		);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	describe('datetime range management', () => {
		cases(
			'props update should update state',
			({ prev, field, next }) => {
				// given
				const wrapper = mount(
					<Manager id={DEFAULT_ID} startDateTime={prev}>
						<DateTimeRangeConsumer />
					</Manager>,
				);

				// when
				act(() => {
					wrapper.setProps({
						[field]: next,
					});
				});
				wrapper.update();

				// then
				const contextValue = wrapper.find('DateTimeRangeConsumerDiv').props();
				expect(contextValue[field]).toEqual(next);
			},
			[
				{
					name: 'should update state when start change',
					field: 'startDateTime',
					prev: new Date(),
					next: new Date(2019, 11, 11),
				},
				{
					name: 'should update state when end change',
					field: 'endDateTime',
					prev: new Date(),
					next: new Date(2019, 11, 11),
				},
			],
		);

		describe('on change', () => {
			cases(
				'should update state',
				({ field, prop, expected }) => {
					// given
					const event = { target: { value: '' } };
					const wrapper = mount(
						<Manager id={DEFAULT_ID} onChange={jest.fn()}>
							<DateTimeRangeConsumer />
						</Manager>,
					);

					// when
					act(() => {
						wrapper.find('DateTimeRangeConsumerDiv').prop(prop)(event, { datetime: expected });
					});
					wrapper.update();

					// then
					const props = wrapper.find('DateTimeRangeConsumerDiv').props();

					expect(props[field]).toEqual(expected);
				},
				[
					{
						name: 'when start change',
						field: 'startDateTime',
						prop: 'onStartChange',
						expected: new Date(2015, 0, 15),
					},
					{
						name: 'when end change',
						field: 'endDateTime',
						prop: 'onEndChange',
						expected: new Date(2015, 0, 15),
					},
				],
			);

			cases(
				'should trigger props.onChange when date change',
				({ prop, field, expected }) => {
					// given
					const onChange = jest.fn();
					const event = { target: { value: '' } };
					const wrapper = mount(
						<Manager id={DEFAULT_ID} onChange={onChange}>
							<DateTimeRangeConsumer />
						</Manager>,
					);

					// when
					act(() => {
						wrapper.find('DateTimeRangeConsumerDiv').prop(prop)(event, { datetime: expected });
					});
					wrapper.update();

					// then
					expect(onChange).toBeCalled();
					const args = onChange.mock.calls[0];
					expect(args[1][field]).toBe(expected);
				},
				[
					{
						name: 'when start change',
						field: 'startDateTime',
						prop: 'onStartChange',
						expected: new Date(2015, 0, 15),
					},
					{
						name: 'when end change',
						field: 'endDateTime',
						prop: 'onEndChange',
						expected: new Date(2015, 0, 15),
					},
				],
			);
		});
	});
});
