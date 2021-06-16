import actions from './actions';
import ACKDispatcher from './components/ACKDispatcher';
import middlewares from './middleware';
import reducers from './reducers';
import { ackProcessed } from './reducers/ack';
import * as constants from './constants';
import sagas from './sagas';

export { actions, ACKDispatcher, constants, middlewares, reducers, sagas, ackProcessed };

export default {
	id: 'cqrs',
	components: { ACKDispatcher },
	actionCreators: actions,
	reducer: reducers,
	preReducer: [ackProcessed],
};
