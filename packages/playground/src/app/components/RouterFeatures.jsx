import cmf, { cmfConnect } from '@talend/react-cmf';
import Layout from '@talend/react-components/lib/Layout';
import HeaderBar from '@talend/react-containers/lib/HeaderBar';
import SidePanel from '@talend/react-containers/lib/SidePanel';

function RouterFeaturesView({ dispatch, matchedItem, sagaStatus }) {
	return (
		<Layout mode="TwoColumns" one={<SidePanel />} header={<HeaderBar />}>
			<main>
				<h1>Router examples</h1>
				<section>
					<h2>Navigation middleware</h2>
					<button
						type="button"
						onClick={() =>
							dispatch({
								type: 'PLAYGROUND_ROUTER_PUSH',
								cmf: { routerPush: '/RouterFeatures/item/pushed-item' },
							})
						}
					>
						Push item route
					</button>{' '}
					<button
						type="button"
						onClick={() =>
							dispatch({
								type: 'PLAYGROUND_ROUTER_REPLACE',
								cmf: { routerReplace: '/RouterFeatures/item/replaced-item' },
							})
						}
					>
						Replace with another item route
					</button>
				</section>
				<section>
					<h2>Route-aware saga</h2>
					<p>
						Matched item parameter: <output>{matchedItem || 'Navigate to an item route.'}</output>
					</p>
					<p role="status">{sagaStatus || 'The route saga is idle.'}</p>
				</section>
			</main>
		</Layout>
	);
}

RouterFeaturesView.displayName = 'RouterFeatures';

function mapStateToProps(state) {
	return {
		matchedItem: cmf.selectors.collections.get(state, 'playground.router.itemId'),
		sagaStatus: cmf.selectors.collections.get(state, 'playground.router.sagaStatus'),
	};
}

export const RouterFeatures = cmfConnect({ mapStateToProps, withDispatch: true })(
	RouterFeaturesView,
);
