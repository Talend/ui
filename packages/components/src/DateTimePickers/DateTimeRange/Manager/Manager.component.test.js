/* eslint-disable react/prop-types */
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Manager from './Manager.component';
import { DateTimeRangeContext } from '../Context';

const DEFAULT_ID = 'DEFAULT_ID';

function DateTimeRangeConsumerDiv(props) {
	return (
		<div data-testid="DateTimeRangeConsumerDiv">
			<button type="button" onClick={() => props.getProps(props)} data-testid="getProps">
				getProps
			</button>
			<button
				type="button"
				onClick={e => props[props.testChange.prop](e, props.testChange.value)}
				data-testid="callme"
			>
				test me
			</button>
		</div>
	);
}
// eslint-disable-next-line react/prop-types
function DateTimeRangeConsumer(props) {
	return (
		<DateTimeRangeContext.Consumer>
			{contextValue => <DateTimeRangeConsumerDiv {...contextValue} {...props} />}
		</DateTimeRangeContext.Consumer>
	);
}

describe('DateTime.Manager', () => {
	it('should render its children', () => {
		// when
		render(
			<Manager
				id={DEFAULT_ID}
				startDateTime={new Date(2017, 3, 4, 15, 27)}
				endDateTime={new Date(2017, 3, 10, 15, 27)}
				onChange={jest.fn()}
			>
				<DateTimeRangeConsumer />
			</Manager>,
		);

		// then
		expect(screen.getByTestId('DateTimeRangeConsumerDiv')).toBeVisible();
	});

	describe('datetime range management', () => {
		test.each([
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
		])('$name', async ({ prev, field, next }) => {
			// given
			const getProps = jest.fn();
			const { rerender } = render(
				<Manager id={DEFAULT_ID} startDateTime={prev} onChange={jest.fn()}>
					<DateTimeRangeConsumer />
				</Manager>,
			);

			// when
			const newProps = { [field]: next };
			rerender(
				<Manager id={DEFAULT_ID} startDateTime={prev} {...newProps} onChange={jest.fn()}>
					<DateTimeRangeConsumer getProps={getProps} />
				</Manager>,
			);

			// then
			await userEvent.click(screen.getByTestId('getProps'));
			const contextValue = getProps.mock.calls[0][0];
			expect(contextValue[field]).toEqual(next);
		});

		describe('on change', () => {
			test.each([
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
			])('$name', async ({ field, prop, expected }) => {
				// given
				const getProps = jest.fn();
				render(
					<Manager id={DEFAULT_ID} onChange={jest.fn()}>
						<DateTimeRangeConsumer
							testChange={{
								prop,
								value: { datetime: expected },
							}}
							getProps={getProps}
						/>
					</Manager>,
				);

				// when
				await userEvent.click(screen.getByTestId('callme'));
				await userEvent.click(screen.getByTestId('getProps'));

				// then
				const props = getProps.mock.calls[0][0];

				expect(props[field]).toEqual(expected);
			});

			test.each([
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
			])('$name', async ({ prop, field, expected }) => {
				// given
				const onChange = jest.fn();
				render(
					<Manager id={DEFAULT_ID} onChange={onChange}>
						<DateTimeRangeConsumer testChange={{ prop, value: { datetime: expected } }} />
					</Manager>,
				);

				// when
				await userEvent.click(screen.getByTestId('callme'));

				// then
				expect(onChange).toHaveBeenCalled();
				const args = onChange.mock.calls[0];
				expect(args[1][field]).toBe(expected);
			});
		});
	});
});
