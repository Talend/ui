import { screen, render, fireEvent } from '@testing-library/react';
import Badge from '@talend/react-components/lib/Badge';
import { BadgeFaceted } from './BadgeFaceted.component';
import { BadgeFacetedProvider } from '../../context/badgeFaceted.context';

// eslint-disable-next-line react/prop-types
const MyWrappedBadge = ({ children, properties, providerValue }) => (
	<BadgeFacetedProvider value={providerValue}>
		<BadgeFaceted {...properties}>{children}</BadgeFaceted>
	</BadgeFacetedProvider>
);

// eslint-disable-next-line react/prop-types
const TestChildren = ({ badgeValue = 'default', onChangeValue, onSubmitBadge, onHideOverlay }) => (
	<div data-testid="badge-overlay">
		<button id="my-cancel-button" onClick={onHideOverlay}>
			cancel
		</button>
		<button data-testid="my-button" id="my-button" onChange={onChangeValue} onClick={onSubmitBadge}>
			{badgeValue}
		</button>
	</div>
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
		const { container } = render(
			<MyWrappedBadge properties={props} providerValue={badgeFacetedContextValue}>
				{renderProps => <TestChildren {...renderProps} />}
			</MyWrappedBadge>,
		);
		// Then
		expect(document.querySelectorAll('div#tc-badge-select-my-id')).toHaveLength(1);
		expect(container.firstChild).toMatchSnapshot();
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
		render(
			<MyWrappedBadge properties={props} providerValue={badgeFacetedContextValue}>
				{renderProps => <TestChildren {...renderProps} />}
			</MyWrappedBadge>,
		);
		fireEvent.click(document.querySelector('button#tc-badge-delete-my-id'));
		// Then
		expect(dispatch).toHaveBeenNthCalledWith(1, {
			payload: { badgeId: 'my-badge-id' },
			type: 'DELETE_BADGE',
		});
	});
	it('should trigger onHideOverlay callback when click cancel button', () => {
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
		render(
			<MyWrappedBadge properties={props} providerValue={badgeFacetedContextValue}>
				{renderProps => <TestChildren {...renderProps} />}
			</MyWrappedBadge>,
		);

		fireEvent.click(screen.getByRole('button', { name: 'All' }));
		fireEvent.click(document.querySelector('button#my-cancel-button'));
		// Then
		expect(dispatch).not.toHaveBeenCalled();
	});
	it('should show special chars when a display type is provided', () => {
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
			labelValue: ' All',
			operator,
			operators,
			t: () => 'Remove filter',
			displayType: Badge.TYPES.VALUE,
		};
		// When
		render(
			<MyWrappedBadge properties={props} providerValue={badgeFacetedContextValue}>
				{renderProps => <TestChildren {...renderProps} />}
			</MyWrappedBadge>,
		);
		expect(
			document.querySelectorAll('#my-id-action-overlay [name="talend-empty-space"]'),
		).toHaveLength(1);
	});
});
