import React from 'react';
import { api } from 'react-cmf';

import LinkDispatcher from '../LinkDispatcher';

/**
 * @example
<LinksDispatcher contentType="article" category="primary" />
 */
function LinksDispatcher(props, context) {
	const actions = api.action.getContentTypeActions(
		context,
		props.contentType,
		props.category
	);
	return (
		<div>
			{actions.map((action, i) => (
				<LinkDispatcher
					action={action}
					key={i}
					{...props}
				/>
			))}
		</div>
	);
}

LinksDispatcher.propTypes = {
	contentType: React.PropTypes.string.isRequired,
	category: React.PropTypes.string.isRequired,
	icon: React.PropTypes.bool,
};

LinksDispatcher.contextTypes = {
	store: React.PropTypes.object,
};
export default LinksDispatcher;
