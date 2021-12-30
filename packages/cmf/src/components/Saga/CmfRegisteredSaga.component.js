import { useEffect } from 'react';
import PropTypes from 'prop-types';
import cmfConnect from '../../cmfConnect';
import { start, stop } from '../../actions/saga';

export function CmfRegisteredSagaComponent({
	dispatch,
	sagaId,
	sagaAttributes,
	componentId = 'default',
	children = null,
}) {
	// If we pass the sagaId, we use the cmf registry
	useEffect(() => {
		if (sagaId) {
			dispatch(start(null, { saga: sagaId, componentId, ...sagaAttributes }));
		}
		return () => {
			if (sagaId) {
				dispatch(stop(null, { saga: sagaId, componentId }));
			}
		};
	}, [sagaId, sagaAttributes, dispatch, componentId]);

	return children;
}

CmfRegisteredSagaComponent.propTypes = {
	dispatch: PropTypes.func.isRequired,
	sagaId: PropTypes.string.isRequired,
	sagaAttributes: PropTypes.any,
	componentId: PropTypes.string,
	children: PropTypes.node,
};
CmfRegisteredSagaComponent.displayName = 'CmfRegisteredSagaComponent';

export const CmfRegisteredSaga = cmfConnect({
	withDispatch: true,
})(CmfRegisteredSagaComponent);
