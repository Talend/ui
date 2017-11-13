import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@talend/react-components';
import Action from '../../Action';
import theme from './Filter.scss';

function Filter({ resetActionId, ...props }) {
	return (
		<div className="form-group">
			<Icon name="talend-search" className={theme['search-icon']} />
			<input
				type="text"
				{...props}
			/>
			<Action
				actionId={resetActionId}
			/>
		</div>
	);
}

Filter.displayName = 'Filter';
Filter.propTypes = {
	resetActionId: PropTypes.string,
};

export default Filter;
