/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { screen, render } from '@testing-library/react';
import Enumeration, { EnumerationComponent } from './Enumeration.component';

vi.mock('./Header/HeaderEnumeration.component', () => ({
	HeaderEnumeration: props => (
		<div data-testid="HeaderEnumeration" data-props={JSON.stringify(props)}></div>
	),
}));
vi.mock('./Items/ItemsEnumeration.component', () => ({
	ItemsEnumeration: props => (
		<div data-testid="ItemsEnumeration" data-props={JSON.stringify(props)}></div>
	),
}));

describe('Enumeration', () => {
	it('should render HeaderEnumeration & ItemsEnumeration', () => {
		render(
			<Enumeration
				id="test"
				className="foo"
				// required props
				headerDefault={[]}
				onInputChange={jest.fn()}
				itemsProp={{
					key: 'id',
				}}
				items={[]}
				foo="bar"
			/>,
		);
		expect(screen.getByTestId('HeaderEnumeration')).toBeVisible();
		expect(screen.getByTestId('ItemsEnumeration')).toBeVisible();
	});

	it('should expose all available modes', () => {
		expect(EnumerationComponent.DISPLAY_MODE_DEFAULT).toBe('DISPLAY_MODE_DEFAULT');
		expect(EnumerationComponent.DISPLAY_MODE_ADD).toBe('DISPLAY_MODE_ADD');
		expect(EnumerationComponent.DISPLAY_MODE_SELECTED).toBe('DISPLAY_MODE_SELECTED');
		expect(EnumerationComponent.DISPLAY_MODE_SEARCH).toBe('DISPLAY_MODE_SEARCH');
		expect(EnumerationComponent.DISPLAY_MODE_EDIT).toBe('DISPLAY_MODE_EDIT');
	});
});
