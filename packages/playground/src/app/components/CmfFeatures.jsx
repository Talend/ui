import cmf, { cmfConnect, Inject } from '@talend/react-cmf';
import Layout from '@talend/react-components/lib/Layout';
import HeaderBar from '@talend/react-containers/lib/HeaderBar';
import SidePanel from '@talend/react-containers/lib/SidePanel';

function CmfFeaturesView({ state, setState, dispatch, onChange, lastAction, httpResult }) {
	const count = state?.get('count', 0) ?? 0;
	const note = state?.get('note', '') ?? '';
	const actionMessage = lastAction?.get('message') ?? 'No collection action has run yet.';
	const httpMessage = httpResult
		? `Fetched ${httpResult.get('name')} (HTTP ${httpResult.get('status')}).`
		: 'No request has run yet.';

	return (
		<Layout mode="TwoColumns" one={<SidePanel />} header={<HeaderBar />}>
			<main>
				<h1>CMF examples</h1>
				<section>
					<h2>Connected component state</h2>
					<p>Count: {count}</p>
					<button
						type="button"
						disabled={!state}
						onClick={() =>
							setState(({ state: previousState }) =>
								previousState.set('count', previousState.get('count', 0) + 1),
							)
						}
					>
						Increment CMF state
					</button>
					<label>
						State note
						<input value={note} onChange={onChange} />
					</label>
				</section>
				<section>
					<h2>Dispatch and action creators</h2>
					<p>{actionMessage}</p>
					<Inject component="CmfFeatureDispatchButton" />{' '}
					<Inject component="CmfFeatureActionButton" />
				</section>
				<section>
					<h2>Registry and expressions</h2>
					<Inject component="CmfFeatureNotice" />
				</section>
				<section>
					<h2>Saga and HTTP</h2>
					<p>{httpMessage}</p>
					<button type="button" onClick={() => dispatch({ type: 'PLAYGROUND_CMF_FETCH' })}>
						Fetch with CMF HTTP saga
					</button>
				</section>
			</main>
		</Layout>
	);
}

CmfFeaturesView.displayName = 'CmfFeatures';

function mapStateToProps(state) {
	return {
		lastAction: cmf.selectors.collections.get(state, 'playground.cmf.lastAction'),
		httpResult: cmf.selectors.collections.get(state, 'playground.cmf.httpResult'),
	};
}

export const CmfFeatures = cmfConnect({
	mapStateToProps,
	withDispatch: true,
	omitCMFProps: false,
})(CmfFeaturesView);

function CmfFeatureNoticeView({ message }) {
	return <p role="status">{message}</p>;
}

CmfFeatureNoticeView.displayName = 'CmfFeatureNotice';

export const CmfFeatureNotice = cmfConnect({})(CmfFeatureNoticeView);

function CmfFeatureActionButtonView({ onClick }) {
	return (
		<button type="button" onClick={onClick}>
			Run configured action creator
		</button>
	);
}

CmfFeatureActionButtonView.displayName = 'CmfFeatureActionButton';

export const CmfFeatureActionButton = cmfConnect({})(CmfFeatureActionButtonView);

function CmfFeatureDispatchButtonView({ onClick }) {
	return (
		<button type="button" onClick={onClick}>
			Dispatch configured event
		</button>
	);
}

CmfFeatureDispatchButtonView.displayName = 'CmfFeatureDispatchButton';

export const CmfFeatureDispatchButton = cmfConnect({})(CmfFeatureDispatchButtonView);
