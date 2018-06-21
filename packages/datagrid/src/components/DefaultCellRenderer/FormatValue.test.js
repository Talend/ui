import React from 'react';
import { shallow } from 'enzyme';
import { FormatValueComponent, hasWhiteSpaceCharacters } from './FormatValue.component';

describe('FormatValue', () => {
	it('should replace the leading/trainling white space and the line feeding', () => {
		// eslint-disable-next-line no-irregular-whitespace
		const value = `﻿﻿﻿﻿﻿﻿﻿  loreum lo
		psum	 	 `;
		const wrapper = shallow(<FormatValueComponent value={value} />);
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should return true when there is leading empty space in the string', () => {
		// eslint-disable-next-line no-irregular-whitespace
		expect(hasWhiteSpaceCharacters('﻿l')).toBe(true);
	});

	it('should return true when there is trailing empty space in the string', () => {
		expect(hasWhiteSpaceCharacters('l﻿')).toBe(true);
	});

	it('should return true when there is line feeding in the string', () => {
		expect(
			hasWhiteSpaceCharacters(`loreum
lopsum`),
		).toBe(true);

		expect(
			hasWhiteSpaceCharacters(`loreum
lopsum`),
		).toBe(true);
	});

	it('should return false when there is no white space', () => {
		expect(hasWhiteSpaceCharacters('loreum lopsum')).toBe(false);
	});

	it('should return false where the string is empty', () => {
		expect(hasWhiteSpaceCharacters('')).toBe(false);
	});

	it('test return false when the string has only with alpha', () => {
		expect(hasWhiteSpaceCharacters('a')).toBe(false);
	});

	it('test return true when the string has only white characters', () => {
		expect(hasWhiteSpaceCharacters(' ')).toBe(true);
	});

	it('test return false when the string is empty', () => {
		expect(hasWhiteSpaceCharacters()).toBe(false);
	});

	it('test return false when the string is not a string', () => {
		expect(hasWhiteSpaceCharacters(1)).toBe(false);
	});
});
