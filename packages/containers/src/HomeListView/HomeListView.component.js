import React, { PropTypes } from 'react';
import { api } from 'react-cmf';
import { Layout } from 'react-talend-components';

import AppHeaderBar from '../AppHeaderBar';
import List from '../List';
import SidePanel from '../SidePanel';

function HomeListView(props) {
	if (!props.sidepanel || !props.list) {
		return null;
	}
	const header = (<AppHeaderBar {...props.header} />);
	return (
		<Layout
			header={header}
			mode="TwoColumns"
			one={(<SidePanel {...props.sidepanel} />)}
			drawers={[props.children]}
		>
			<List {...props.list} />
		</Layout>
	);
}

HomeListView.displayName = 'HomeListView';
HomeListView.propTypes = {
	header: Layout.propTypes.header,
	sidepanel: PropTypes.shape({
		actionIds: PropTypes.arrayOf(PropTypes.string),
	}).isRequired,
	didMountActionCreator: PropTypes.string,
	list: PropTypes.shape({
	}).isRequired,
	dispatch: PropTypes.func.isRequired,
	children: PropTypes.node,
};

export default HomeListView;
