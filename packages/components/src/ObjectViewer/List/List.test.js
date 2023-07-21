import { screen, render } from '@testing-library/react';
import List from './List.component';

describe('ObjectViewer.List', () => {
	beforeEach(() => {
		Object.defineProperties(window.HTMLElement.prototype, {
			offsetParent: {
				get() {
					return {
						offsetWith: parseFloat(this.style.width) || 0,
					};
				},
			},
		});
	});

	it('should render List with props data as an object', () => {
		// Given
		const schema = new Map();
		schema.set('field0', 'type1').set('field1', 'type2');
		const data = {
			dataset: [{ field0: 'header1' }, { field1: 'header2' }],
			schema,
		};
		// When
		const { container } = render(<List id="my-object-list" data={data} flat />);
		// Then
		expect(container.firstChild).toMatchSnapshot();
	});
	it('should render List with props data as an array', () => {
		// Given
		const data = [{ field0: 'header1' }, { field1: 'header2' }];
		// When
		render(<List id="my-object-list" data={data} flat />);
		// Then
		expect(screen.getAllByRole('listitem').length).toBe(2);
	});
	it('should render null if no data', () => {
		const data = [{ foo: 'bar' }, {}];
		render(<List data={data} />);
		expect(screen.getByRole('list')).toBeVisible();
		expect(screen.getAllByRole('listitem').length).toBe(2);
	});
});
