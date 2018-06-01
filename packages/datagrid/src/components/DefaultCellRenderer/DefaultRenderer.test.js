import React from 'react';
import { shallow } from 'enzyme';

import DefaultRenderer from './DefaultRenderer.component';

describe('#DefaultRenderer', () => {
	it('should render DefaultRenderer with a advanced tooltip', () => {
		// eslint-disable-next-line no-irregular-whitespace
		const value = `﻿﻿﻿﻿﻿﻿﻿  loreum lo
		psum	 	 `;
		const wrapper = shallow(<DefaultRenderer data={{ value }} />);

		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render DefaultRenderer with a label tooltip', () => {
		const value = 'loreum';
		const wrapper = shallow(<DefaultRenderer data={{ value }} />);

		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
