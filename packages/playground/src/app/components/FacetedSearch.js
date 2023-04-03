import FacetedSearch from '@talend/react-faceted-search';
import Layout from '@talend/react-components/lib/Layout';
import SidePanel from '@talend/react-containers/lib/SidePanel';
import HeaderBar from '@talend/react-containers/lib/HeaderBar';
// eslint-disable-next-line @talend/import-depth
import * as badges from '@talend/react-faceted-search/stories/badgesDefinitions';

function action(msg) {
	// eslint-disable-next-line no-console
	return (...args) => console.log(msg, ...args);
}

const badgesDefinitions = Object.values(badges);

const callbacks = {
	getTags: () =>
		new Promise(resolve =>
			setTimeout(resolve, 2000, [
				'clean',
				'production',
				'last chunk',
				'salesforce',
				'outdated',
				'extracted',
				'security',
				'in processing',
				'deep learning',
				'sql',
				'cluster',
				'visualization',
				'analytics',
				'users',
				'warehouse',
				'api',
			]),
		),
};

export function FacetedSearchPlayground() {
	return (
		<Layout mode="TwoColumns" one={<SidePanel />} header={<HeaderBar />}>
			<FacetedSearch.Faceted>
				{currentFacetedMode =>
					(currentFacetedMode === FacetedSearch.constants.FACETED_MODE.ADVANCED && (
						<FacetedSearch.AdvancedSearch onSubmit={action('onSubmit')} />
					)) ||
					(currentFacetedMode === FacetedSearch.constants.FACETED_MODE.BASIC && (
						<FacetedSearch.BasicSearch
							badgesDefinitions={badgesDefinitions}
							callbacks={callbacks}
							onSubmit={action('onSubmit')}
						/>
					))
				}
			</FacetedSearch.Faceted>
		</Layout>
	);
}
