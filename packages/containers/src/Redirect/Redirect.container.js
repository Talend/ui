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
export function RedirectContainer({ path, to }, context) {
	context.store.dispatch({
		type: REDIRECT_ACTION_TYPE,
		cmf: {
			routerReplace: to || path,
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
	to: PropTypes.string,
};
RedirectContainer.contextTypes = {
	store: PropTypes.object.isRequired,
};

RedirectContainer.displayName = 'RedirectContainer';

export default cmfConnect({
	omitCMFProps: true,
	withComponentRegistry: true,
	withDispatch: true,
	withDispatchActionCreator: true,
	withComponentId: true,
})(RedirectContainer);
