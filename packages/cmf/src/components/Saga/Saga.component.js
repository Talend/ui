import { useEffect } from 'react';
import { start, stop } from '../../actions/saga';

export function Saga({ dispatch, sagaId, sagaAttributes }) {
	useEffect(() => {
		dispatch(start(null, { saga: sagaId, props: sagaAttributes }));
		return () => {
			dispatch(stop(null, { saga: sagaId }));
		};
	}, [sagaId, sagaAttributes, dispatch]);

	return null;
}
