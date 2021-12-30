import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { v4 } from 'uuid';
import cmfConnect from '../../cmfConnect';
import { start, stop } from '../../actions/saga';

export function CmfRegisteredSagaComponent({
	dispatch,
	sagaId,
	sagaAttributes,
	componentId = 'default',
	children = null,
}) {
	// useState is used to keep the v4 value
	const [id] = useState(v4());
	// If we pass the sagaId, we use the cmf registry
	useEffect(() => {
		if (sagaId) {
			dispatch(
				start(
					{ type: 'DID_MOUNT', componentId: id },
					{ saga: sagaId, componentId, ...sagaAttributes },
				),
			);
		}
		return () => {
			if (sagaId) {
				dispatch(stop({ type: 'WILL_UNMOUNT', componentId: id }, { saga: sagaId, componentId }));
			}
		};
	}, [sagaId, componentId]);

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
