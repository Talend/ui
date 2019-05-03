import HttpErrorView from './component/HttpErrorView.component';
import handler from './saga/http.saga';
import actionCreators from './actions/redirectTo';
import routes from './settings/routes.json';
import fallback from './settings/fallback.json';

export default {
	id: 'cmf-http-error',
	actionCreators,
	components: { HttpErrorView },
	settings: [routes, fallback],
	sagas: handler,
};
