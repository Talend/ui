import React, { PropTypes } from 'react';
import { api } from 'react-cmf';
import { Actions as PureActions } from 'react-talend-components';

/**
 * @param {object} props react props
 * @example
<Actions name="Hello world"></Actions>
 */
function Actions({
	category,
	contentType,
	hideLabel,
	tooltipPlacement,
	link,
}, context) {
	const actions = api.action.getContentTypeActions(
		context,
		contentType,
		category
	);
	return (
		<PureActions
			actions={actions}
			hideLabel={hideLabel || false}
			tooltipPlacement={tooltipPlacement}
			link={link || false}
		/>
	);
}

Actions.propTypes = {
	contentType: PropTypes.string.isRequired,
	category: PropTypes.string.isRequired,
	hideLabel: PropTypes.boolean,
	link: PropTypes.boolean,
	tooltipPlacement: PropTypes.string,
};

Actions.contextTypes = {
	store: React.PropTypes.object,
};

export default Actions;
