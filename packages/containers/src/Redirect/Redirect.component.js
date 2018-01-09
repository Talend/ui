import PropTypes from 'prop-types';
import React from 'react';
import { cmfConnect } from '@talend/react-cmf';
import { CircularProgress } from '@talend/react-components';

export const REDIRECT_ACTION_TYPE = 'REDIRECT';

/**
 * @param {object} props react props
 * @example
<Redirect name="Hello world"></Redirect>
 */
export function RedirectContainer({ path }, context) {
	context.store.dispatch({
		type: REDIRECT_ACTION_TYPE,
		cmf: {
			routerReplace: path,
		},
	});
	return (
		<div>
			<CircularProgress />
			Redirect ...
		</div>
	);
}

RedirectContainer.propTypes = {
	path: PropTypes.string,
};
RedirectContainer.contextTypes = {
	store: PropTypes.object.isRequired,
};

export default cmfConnect({})(RedirectContainer);
