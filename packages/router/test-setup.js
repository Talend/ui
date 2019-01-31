/**
 * This file is here because this module is not part of the lerna.
 * So we have enzyme in the current node_module.
 * If we use ../../test-setup it doesn t work because we have two enzyme
 * so it complains about not having any enzyme-adapter for react.
 */
/* eslint-disable global-require,no-plusplus */
import '@babel/polyfill';

import { configure } from 'enzyme';
import AdapterReact from 'enzyme-adapter-react-16';

configure({ adapter: new AdapterReact() });
