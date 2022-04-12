import React from 'react';
import { ButtonIconFloating } from '@talend/design-system';

import ColumnChooser from './ColumnChooser.component';
import ColumnChooserButton from '../../Toolbar/ColumnChooserButton';
import theme from './ColumnChooserHeaderButton.scss';

export const ColumnChooserHeaderButton = props => {
	return (
		<div className={theme['column-chooser-header-button-container']}>
			<ColumnChooser {...props} buttonRenderer={ButtonIconFloating} />
		</div>
	);
};

ColumnChooserHeaderButton.propTypes = ColumnChooserButton.propTypes;
