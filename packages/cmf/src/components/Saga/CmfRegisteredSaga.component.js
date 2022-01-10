import { useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { v4 } from 'uuid';
import { start, stop } from '../../actions/saga';

export function CmfRegisteredSagaComponent({
	sagaId,
	startSaga,
	stopSaga,
	sagaAttributes,
	componentId = 'default',
	children = null,
}) {
	const id = useMemo(v4, []);
	// If we pass the sagaId, we use the cmf registry
	useEffect(() => {
		if (sagaId) {
			startSaga(
				{ type: 'DID_MOUNT', componentId: id },
				{ saga: sagaId, componentId, ...sagaAttributes },
			);
		}
		return () => {
			if (sagaId) {
				stopSaga({ type: 'WILL_UNMOUNT', componentId: id }, { saga: sagaId, componentId });
			}
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return children;
}

CmfRegisteredSagaComponent.propTypes = {
	sagaId: PropTypes.string.isRequired,
	startSaga: PropTypes.func.isRequired,
	stopSaga: PropTypes.func.isRequired,
	sagaAttributes: PropTypes.any,
	componentId: PropTypes.string,
	children: PropTypes.node,
};
CmfRegisteredSagaComponent.displayName = 'CmfRegisteredSagaComponent';

const mapDispatchToProps = dispatch => ({
	startSaga: (event, properties) => dispatch(start(event, properties)),
	stopSaga: (event, properties) => dispatch(stop(event, properties)),
});

export const CmfRegisteredSaga = connect(null, mapDispatchToProps)(CmfRegisteredSagaComponent);
