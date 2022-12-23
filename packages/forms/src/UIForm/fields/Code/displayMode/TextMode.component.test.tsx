import React from 'react';

import { render } from '@testing-library/react';

import TextMode from './TextMode.component';

describe('Code text display mode', () => {
	const schema = {
		title: 'My input title',
	};

	it('should render textarea', () => {
		// when
		const { baseElement } = render(<TextMode id="myForm" schema={schema} value="toto" />);

		// then
		expect(baseElement).toMatchSnapshot();
	});

	it('should render with provided style options', () => {
		// given
		const schemaWithRows = {
			...schema,
			rows: 10,
		};

		// when
		const { baseElement } = render(
			<TextMode id="myForm" schema={schemaWithRows} value="toto" options={{ height: '20px' }} />,
		);

		// then
		expect(baseElement).toMatchSnapshot();
	});
});
