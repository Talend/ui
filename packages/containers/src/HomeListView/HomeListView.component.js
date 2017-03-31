import React, { PropTypes } from 'react';
import { Layout } from 'react-talend-components';

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
			drawers={children}
		>
			<List {...list} />
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
