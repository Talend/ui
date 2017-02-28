import React, { PropTypes } from 'react';
import { Layout, WithDrawer } from 'react-talend-components';

import AppHeaderBar from '../AppHeaderBar';
import List from '../List';
import SidePanel from '../SidePanel';

function HomeListView({ sidepanel, list, header, children }) {
	if (!sidepanel || !list) {
		return null;
	}
	return (
		<Layout
			mode="TwoColumns"
			header={(<AppHeaderBar {...header} />)}
			one={(<SidePanel {...sidepanel} />)}
		>
			<WithDrawer drawers={[children]}>
				<List {...list} />
			</WithDrawer>
		</Layout>
	);
}

HomeListView.displayName = 'HomeListView';
HomeListView.propTypes = {
	header: Layout.propTypes.header,
	sidepanel: PropTypes.shape({
		actionIds: PropTypes.arrayOf(PropTypes.string),
	}).isRequired,
	list: PropTypes.shape({
	}).isRequired,
	children: PropTypes.node,
};

export default HomeListView;
