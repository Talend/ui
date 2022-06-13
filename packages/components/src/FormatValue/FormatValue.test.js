import React from 'react';

import { render } from '@testing-library/react';

import { FormatValueComponent } from './FormatValue.component';

describe('FormatValue', () => {
	it('should replace the leading/trainling white space and the line feeding', () => {
		// eslint-disable-next-line no-irregular-whitespace
		const value = `﻿﻿﻿﻿﻿﻿﻿  loreum lo
		psum	 	 `;
		const wrapper = render(<FormatValueComponent value={value} />);
		expect(wrapper.asFragment()).toMatchSnapshot();
	});

	it('should handle leading empty space in the string', () => {
		const wrapper = render(<FormatValueComponent value={'﻿l '} />);
		expect(wrapper.asFragment()).toMatchSnapshot();
	});

	it('should handle trailing empty space in the string', () => {
		const wrapper = render(<FormatValueComponent value={' l﻿'} />);
		expect(wrapper.asFragment()).toMatchSnapshot();
	});

	it('should handle line feeding in the string', () => {
		const wrapper = render(
			<FormatValueComponent
				value={`loreum
lopsum`}
			/>,
		);
		expect(wrapper.asFragment()).toMatchSnapshot();
	});

	it('should handle white space', () => {
		const wrapper = render(<FormatValueComponent value="loreum lopsum" />);
		expect(wrapper.asFragment()).toMatchSnapshot();
	});

	it('should handle empty string', () => {
		const wrapper = render(<FormatValueComponent value="" />);
		expect(wrapper.asFragment()).toMatchSnapshot();
	});

	it('should handle string with only alpha', () => {
		const wrapper = render(<FormatValueComponent value="a" />);
		expect(wrapper.asFragment()).toMatchSnapshot();
	});

	it('should handle string with only white characters', () => {
		const wrapper = render(<FormatValueComponent value=" " />);
		expect(wrapper.asFragment()).toMatchSnapshot();
	});

	it('should handle non string param', () => {
		const wrapper = render(<FormatValueComponent value={2} />);
		expect(wrapper.asFragment()).toMatchSnapshot();
	});
});
