import React from 'react';
import { mount } from '@cypress/react';
import { setGlobalConfig } from '@storybook/testing-react';
import * as globalStorybookConfig from '../../.storybook/preview'; // path of your preview.js file

setGlobalConfig(globalStorybookConfig);

Cypress.Commands.add('mount', reactElement => {
	mount(reactElement);
});
