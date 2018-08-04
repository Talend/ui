import actions from './actions';
import ACKDispatcher from './components/ACKDispatcher';
import reducers from './reducers';
import { ackProcessed } from './reducers/ack';

export default {
	components: { ACKDispatcher },
	actionCreators: actions,
	reducer: reducers,
	preReducer: [ackProcessed],
};
