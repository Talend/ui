import actions from './actions';
import ACKDispatcher from './components/ACKDispatcher';
import * as constants from './constants';
import middlewares from './middleware';
import reducers from './reducers';
import { ackProcessed } from './reducers/ack';
import sagas from './sagas';

export { useWebSocket } from './useWebSocket.hook';
export { actions, ACKDispatcher, constants, middlewares, reducers, sagas, ackProcessed };

export default {
	id: 'cqrs',
	components: { ACKDispatcher },
	actionCreators: actions,
	reducer: reducers,
	preReducer: [ackProcessed],
};
