import React from 'react';
import { mount } from '@cypress/react';

import ThemeProvider from '../../src/components/ThemeProvider';

Cypress.Commands.add('mount', jsx => {
	mount(React.createElement(ThemeProvider, null, jsx));
});
