import { render, screen } from '@testing-library/react';

import TextMode from './TextMode.component';

describe('Code text display mode', () => {
	const schema = {
		title: 'My input title',
	};

	it('should render with value', () => {
		// given
		const value = 'a-value';

		// when
		render(<TextMode id="myForm" schema={schema} value={value} />);

		// then
		expect(screen.getByText(value)).toBeInTheDocument();
	});

	it('should render with provided style options', () => {
		// given
		const schemaWithRows = {
			...schema,
			rows: 10,
		};

		const style = { height: '20px' };
		const value = 'a-value';

		// when
		render(<TextMode id="myForm" schema={schemaWithRows} value={value} options={style} />);

		// then
		expect(screen.getByText(value).style.height).toStrictEqual(style.height);
	});
});
