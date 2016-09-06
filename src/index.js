import api from './api';
import App from './App';
import ConnectedDispatcher from './Dispatcher';
import Icon from './Icon';
import RegistryProvider from './RegistryProvider';
import UIRouter from './UIRouter';
import actions from './actions/';
import reducers from './reducers/';

const Dispatcher = ConnectedDispatcher;

export {
	api,
	App,
	Icon,
	RegistryProvider,
	actions,
	reducers,
	UIRouter,
	Dispatcher,
};
