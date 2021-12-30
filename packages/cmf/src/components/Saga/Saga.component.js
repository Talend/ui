import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { v4 } from 'uuid';
import cmfConnect from '../../cmfConnect';
import { actions } from './Saga.saga';

export function SagaComponent({ dispatch, sagaFunction, sagaId, sagaAttributes, children = null }) {
	// useState is used to keep the v4 value
	const [id] = useState(sagaId || v4());

	useEffect(() => {
		if (id) {
			dispatch(actions.startSaga(id, sagaFunction, sagaAttributes));
		}
		return () => {
			if (id) {
				dispatch(actions.stopSaga(id));
			}
		};
	}, [id]);

	return children;
}

SagaComponent.propTypes = {
	dispatch: PropTypes.func.isRequired,
	saga: PropTypes.func.isRequired,
	sagaId: PropTypes.string,
	sagaAttributes: PropTypes.any,
	children: PropTypes.node,
};
SagaComponent.displayName = 'SagaComponent';

export const Saga = cmfConnect({
	withDispatch: true,
})(SagaComponent);
