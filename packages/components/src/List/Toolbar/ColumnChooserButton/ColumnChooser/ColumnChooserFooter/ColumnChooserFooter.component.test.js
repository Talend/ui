import { screen, render } from '@testing-library/react';
import getDefaultT from '../../../../../translate';
import Component from './ColumnChooserFooter.component';
import { ColumnChooserProvider } from '../columnChooser.context';

describe('ColumnChooserFooter', () => {
	it('should render by default', () => {
		// given
		const id = 'footer-context-id';
		// when
		const { container } = render(
			<ColumnChooserProvider
				value={{
					id,
					t: getDefaultT(),
				}}
			>
				<Component />
			</ColumnChooserProvider>,
		);
		// then
		expect(container.firstChild).toMatchSnapshot();
	});
	it('should render the children', () => {
		// given
		const Children = () => <div data-testid="my-child">Hello world</div>;
		// when
		render(
			<Component>
				<Children />
			</Component>,
		);
		// then
		expect(screen.getByTestId('my-child')).toBeVisible();
	});
});
