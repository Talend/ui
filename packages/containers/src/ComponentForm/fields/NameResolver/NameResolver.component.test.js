import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import withNameResolver from './NameResolver.component';

const NameResolverDumbComponent = withNameResolver(props => (
	<div data-testid="resolved">
		<button onClick={() => props.getResolved(props.resolveName(props.test))}>resolveName</button>
	</div>
));

describe('Name resolver component', () => {
	it('should resolve unknown value name from properties', async () => {
		// given
		const getResolved = jest.fn();
		const properties = { my: { path: { myValue: 'lol', $myValue_name: 'lol name' } } };
		const schema = { key: ['my', 'path', 'myValue'] };

		render(
			<NameResolverDumbComponent
				properties={properties}
				schema={schema}
				test="new lol"
				getResolved={getResolved}
			/>,
		);
		// when
		await userEvent.click(screen.getByText('resolveName'));

		// then
		expect(getResolved).toHaveBeenCalledWith('lol name');
	});

	it('should return value as name if no name is provided in properties', async () => {
		// given
		const getResolved = jest.fn();
		const properties = { my: { path: { myValue: 'lol' } } };
		const schema = { key: ['my', 'path', 'myValue'] };

		render(
			<NameResolverDumbComponent
				properties={properties}
				schema={schema}
				getResolved={getResolved}
				test="new lol"
			/>,
		);

		// when
		await userEvent.click(screen.getByText('resolveName'));

		// then
		expect(getResolved).toHaveBeenCalledWith('new lol');
	});
});
