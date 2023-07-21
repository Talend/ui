import { screen, render } from '@testing-library/react';
import { ListContext, useListContext } from './context';

function TestComponent() {
	const context = useListContext();
	return <div data-testid="TestComponent" {...context} />;
}

describe('List context', () => {
	it('should throw when used outside of context provider', () => {
		// when
		const toThrow = () => render(<TestComponent />);
		// then
		expect(toThrow).toThrow(
			'@talend/react-components > List: you are using a sub component out of List.Manager.',
		);
	});
	it('should throw when used outside of context provider', () => {
		// given
		const value = { id: 'lol' };

		// when
		render(
			<ListContext.Provider value={value}>
				<TestComponent />
			</ListContext.Provider>,
		);
		// then
		expect(screen.getByTestId('TestComponent')).toHaveAttribute('id', 'lol');
	});
});
