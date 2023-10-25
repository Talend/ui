/* eslint-disable react/display-name */
import { render, screen } from '@testing-library/react';
import SimpleTextKeyValue from './SimpleTextKeyValue.component';

jest.unmock('@talend/design-system');
jest.mock('./DefaultValueRenderer.component', () => {
	return props => <span data-testid="DefaultValueRenderer" data-props={JSON.stringify(props)} />;
});

describe('SimpleTextKeyValue', () => {
	it('should render the key and the value', () => {
		const { container } = render(
			<SimpleTextKeyValue
				className="myCLass"
				formattedKey="myKey"
				value="myValue"
				separator=" : "
				style={{ padding: 0 }}
			/>,
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	it('should render the key by the talend.component.label property', () => {
		render(
			<SimpleTextKeyValue
				className="myCLass"
				formattedKey="non readable value"
				schema={{ 'talend.component.label': 'readable value' }}
				value="myValue"
				separator=" : "
				style={{ padding: 0 }}
			/>,
		);
		expect(screen.getByText(/readable value/)).toBeVisible();
	});
	it('should render only the key', () => {
		render(<SimpleTextKeyValue formattedKey="myKey" />);
		expect(screen.getByText('myKey')).toBeVisible();
		expect(screen.getByText('myKey')).toHaveClass('tc-simple-text-key');
	});
	it('should render only the value', () => {
		render(<SimpleTextKeyValue value="myValue" />);
		expect(screen.getByText('myValue')).toBeVisible();
		expect(screen.getByText('myValue')).toHaveClass('tc-simple-text-value');
	});
	it('should render the type', () => {
		const schema = {
			type: {
				type: 'int',
			},
		};
		const data = {
			value: '',
		};
		render(
			<SimpleTextKeyValue
				className="myCLass"
				formattedKey="myKey"
				value={data}
				schema={schema}
				displayTypes
			/>,
		);
		expect(screen.getByText('- int')).toBeVisible();
		expect(screen.getByText('- int')).toHaveClass('tc-simple-text-type');
	});
	it('should render the type with a custom render', () => {
		const schema = {
			type: {
				type: 'int',
			},
		};
		const data = {
			value: '',
		};
		render(
			<SimpleTextKeyValue
				className="myCLass"
				formattedKey="myKey"
				value={data}
				schema={schema}
				displayTypes
				typesRenderer={s => <span>And the type is {s.type.type}</span>}
			/>,
		);
		expect(screen.getByText('And the type is int')).toBeVisible();
		expect(screen.getByText('And the type is int').parentElement).toHaveClass(
			'tc-simple-text-type',
		);
	});
});
