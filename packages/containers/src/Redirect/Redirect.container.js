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
export function Redirect({ path, to, dispatch, componentId }) {
	dispatch({
		type: REDIRECT_ACTION_TYPE,
		componentId,
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

Redirect.propTypes = {
	path: PropTypes.string,
	to: PropTypes.string,
	dispatch: PropTypes.func,
	componentId: PropTypes.string,
};

Redirect.displayName = 'Redirect';

export default cmfConnect({
	omitCMFProps: true,
	withDispatch: true,
	withComponentId: true,
})(Redirect);
