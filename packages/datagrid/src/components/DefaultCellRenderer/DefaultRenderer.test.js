import React from 'react';

import { render } from '@testing-library/react';

import DefaultValueRenderer from './DefaultValueRenderer.component';

describe('#DefaultRenderer', () => {
	it('should render DefaultRenderer with a advanced tooltip', () => {
		// eslint-disable-next-line no-irregular-whitespace
		const value = `﻿﻿﻿﻿﻿﻿﻿  loreum lo
		psum	 	 `;
		const wrapper = render(<DefaultValueRenderer value={{ value }} />);

		expect(wrapper.asFragment()).toMatchSnapshot();
	});
});
