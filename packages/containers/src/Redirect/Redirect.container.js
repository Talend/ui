import PropTypes from 'prop-types';
import React from 'react';
import { cmfConnect } from '@talend/react-cmf';
import AppLoader from '@talend/react-components/lib/AppLoader';

export const REDIRECT_ACTION_TYPE = 'REDIRECT';

/**
 * @param {object} props react props
 * @example
<Redirect name="Hello world"></Redirect>
 */
function Redirect({ path, to, dispatch, componentId }) {
	React.useLayoutEffect(() => {
		dispatch({
			type: REDIRECT_ACTION_TYPE,
			componentId,
			cmf: {
				routerReplace: to || path,
			},
		});
	}, [dispatch, path, to, componentId]);
	return <AppLoader />;
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
