/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import { act } from 'react-dom/test-utils';
import { ColumnChooserProvider } from '../columnChooser.context';
import getDefaultT from '../../../../../translate';

import Component from './ColumnChooserBody.component';

// eslint-disable-next-line react/prop-types
const BodyWithContext = ({ children, columnsChooser, id, t = getDefaultT(), ...rest }) => (
	<ColumnChooserProvider
		value={{
			columnsChooser,
			id,
			t,
		}}
	>
		<Component {...rest}>{children}</Component>
	</ColumnChooserProvider>
);

const columns = [
	{ hidden: undefined, label: 'col1', locked: true, order: 1 },
	{ hidden: undefined, label: 'col2', locked: true, order: 2 },
	{ hidden: undefined, label: 'col3', order: 3 },
	{ hidden: undefined, label: 'col4', order: 4 },
	{ hidden: true, label: 'col5', order: 5 },
	{ hidden: undefined, label: 'col6', order: 6 },
];

describe('ColumnChooserBody', () => {
	it('should render by default', () => {
		// Given
		const columnsChooser = columns;
		// When
		const wrapper = mount(
			<BodyWithContext columnsChooser={columnsChooser} id={'body-context-id'} />,
		);
		// Then
	});
});
