import React from 'react';
import HeaderCheckbox from './HeaderCheckbox.component';

export const cellType = 'checkbox';

export default {
	headerRenderer: props => <HeaderCheckbox {...props} />,
};
