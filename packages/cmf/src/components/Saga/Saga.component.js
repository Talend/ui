import { useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { v4 } from 'uuid';
import { actions } from './Saga.saga';

export function SagaComponent({ startSaga, stopSaga, saga, sagaAttributes, children = null }) {
	const id = useMemo(v4, []);

	useEffect(() => {
		startSaga(id, saga, sagaAttributes);
		return () => {
			stopSaga(id);
		};
		// We don't want to trigger new start and stop, this component is not mean to change props
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id]);

	return children;
}

SagaComponent.propTypes = {
	dispatch: PropTypes.func.isRequired,
	startSaga: PropTypes.func.isRequired,
	stopSaga: PropTypes.func.isRequired,
	saga: PropTypes.func.isRequired,
	sagaAttributes: PropTypes.any,
	children: PropTypes.node,
};
SagaComponent.displayName = 'SagaComponent';

const mapDispatchToProps = dispatch => ({
	startSaga: (id, sagaFunction, sagaAttributes) =>
		dispatch(actions.startSaga(id, sagaFunction, sagaAttributes)),
	stopSaga: id => dispatch(actions.stopSaga(id)),
});

export const Saga = connect(null, mapDispatchToProps)(SagaComponent);
