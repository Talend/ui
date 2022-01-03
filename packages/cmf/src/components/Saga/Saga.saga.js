import { spawn, cancel, take, takeEvery } from 'redux-saga/effects';

export const SAGA_COMPONENT_ACTIONS = {
	SAGA_COMPONENT_START: 'SAGA_COMPONENT_START',
	SAGA_COMPONENT_STOP: 'SAGA_COMPONENT_STOP',
};

// This map of saga is used to keep the generator
// We can't pass it into redux as it's not serializable
export const sagaList = {};

const startSaga = (sagaId, saga, sagaProps) => {
	sagaList[sagaId] = saga;
	return { type: SAGA_COMPONENT_ACTIONS.SAGA_COMPONENT_START, sagaId, sagaProps };
};
const stopSaga = sagaId => {
	delete sagaList[sagaId];
	return { type: `${SAGA_COMPONENT_ACTIONS.SAGA_COMPONENT_STOP}-${sagaId}` };
};

export const actions = {
	startSaga,
	stopSaga,
};

function* handleNewSaga({ sagaId, sagaProps = {} }) {
	const saga = sagaList[sagaId];

	if (!saga) {
		throw new Error(`saga not found: ${sagaId}`);
	}

	const task = yield spawn(saga, sagaProps);
	yield take(`${SAGA_COMPONENT_ACTIONS.SAGA_COMPONENT_STOP}-${sagaId}`);
	yield cancel(task);
}

export function* handleSagaComponent() {
	yield takeEvery(SAGA_COMPONENT_ACTIONS.SAGA_COMPONENT_START, handleNewSaga);
}
