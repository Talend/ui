import React from 'react';
import PropTypes from 'prop-types';
import { ButtonIconFloating } from '@talend/design-system';

import ColumnChooser from './ColumnChooser.component';
import ColumnChooserButton from '../../Toolbar/ColumnChooserButton';
import theme from './ColumnChooserHeaderButton.scss';

export default function ColumnChooserHeaderButton(props) {
	return (
		<div className={theme['column-chooser-header-button-container']}>
			<ColumnChooser {...props} buttonRenderer={ButtonIconFloating} />
		</div>
	);
}

ColumnChooserHeaderButton.propTypes = PropTypes.oneOfType(
	ColumnChooserButton.propTypes,
	PropTypes.bool,
);
