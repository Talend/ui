/* eslint-disable no-console */

/**
 * Import theme.
 * Being the first import is important, so that it is the default style
 * and other style can override it
 */
import '@talend/bootstrap-theme/dist/bootstrap.css';
import cmf from '@talend/react-cmf';
import getRouter from '@talend/react-cmf-router';
import { AppLoader } from '@talend/react-components';
import containersModule from '@talend/react-containers';
import ComponentForm from '@talend/react-containers/lib/ComponentForm';
import { call, cancelled, put, take, takeLatest } from 'redux-saga/effects';

import actions from './actions/index.js';
import {
	CmfFeatureActionButton,
	CmfFeatureDispatchButton,
	CmfFeatureNotice,
	CmfFeatures,
} from './components/CmfFeatures.jsx';
import ComponentFormSandbox from './components/ComponentFormSandbox.jsx';
import { Dataviz } from './components/Dataviz.jsx';
import { FacetedSearchPlayground } from './components/FacetedSearch.jsx';
import { Icons } from './components/Icons.jsx';
import { LeaguesList } from './components/List.jsx';
import { RouterFeatures } from './components/RouterFeatures.jsx';
import { initI18n } from './i18n.js';

// thanks ui-scripts
let basename = window.basename;
if (basename === '/') {
	basename = undefined;
}

function* routerItemSaga({ itemId }) {
	try {
		yield put(cmf.actions.collections.addOrReplace('playground.router.itemId', itemId));
		yield put(
			cmf.actions.collections.addOrReplace(
				'playground.router.sagaStatus',
				`Watching route parameter ${itemId}.`,
			),
		);
		yield take('PLAYGROUND_ROUTER_STOP');
	} finally {
		if (yield cancelled()) {
			yield put(
				cmf.actions.collections.addOrReplace(
					'playground.router.sagaStatus',
					`Route saga for ${itemId} was cancelled.`,
				),
			);
		}
	}
}

function* fetchCmfSample() {
	const { data, response } = yield call(cmf.sagas.http.get, '/api/mock/header-bar/products-list');
	yield put(
		cmf.actions.collections.addOrReplace('playground.cmf.httpResult', {
			name: data[0].name,
			status: response.status,
		}),
	);
}

function* playgroundSaga() {
	function* recordConfiguredDispatch({ message }) {
		yield put(
			cmf.actions.collections.addOrReplace('playground.cmf.lastAction', {
				message,
			}),
		);
	}

	yield takeLatest('PLAYGROUND_CMF_FETCH', fetchCmfSample);
	yield takeLatest('PLAYGROUND_CMF_FETCH', fetchCmfSample);
	yield takeLatest('PLAYGROUND_CMF_DISPATCHED', recordConfiguredDispatch);
}

const router = getRouter({
	basename,
	sagaRouterConfig: {
		'/RouterFeatures/item/:itemId': routerItemSaga,
	},
});

initI18n();

const app = {
	components: {
		CmfFeatureActionButton,
		CmfFeatureDispatchButton,
		CmfFeatureNotice,
		CmfFeatures,
		ComponentForm,
		ComponentFormSandbox,
		FacetedSearch: FacetedSearchPlayground,
		LeaguesList,
		Dataviz,
		Icons,
		RouterFeatures,
	},
	settingsURL: `${basename || ''}/settings.json`,
	actionCreators: actions,
	saga: playgroundSaga,
	middlewares: [],
	modules: [router.cmfModule, containersModule],
	RootComponent: router.RootComponent,
	AppLoader,
};

async function enableMocking() {
	if (!import.meta.env.DEV) {
		return;
	}
	const { worker } = await import('../../mockVite/browser.js');
	await worker.start({
		onUnhandledRequest: 'bypass',
		serviceWorker: {
			url: `${import.meta.env.BASE_URL}mockServiceWorker.js`,
		},
	});
}

// eslint-disable-next-line no-console
console.log('app bootstrap should happens only once');
/**
 * Initialize CMF
 * This will:
 * - Register your components in the CMF registry
 * - Register your action creators in CMF registry
 * - Setup redux store using reducer
 * - Fetch the settings
 * - render react-dom in the dom 'app' element
 */
enableMocking().then(() => cmf.bootstrap(app));
