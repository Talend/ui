import React from 'react';
import { shallow } from 'enzyme';
import FormatValue from './FormatValue.component';

describe('FormatValue', () => {
	it('should replace the leading/trainling white space and the line feeding', () => {
		// eslint-disable-next-line no-irregular-whitespace
		const value = `﻿﻿﻿﻿﻿﻿﻿  loreum lo
		psum	 	 `;
		const wrapper = shallow(<FormatValue value={value} />);
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
