import React, { PropTypes } from 'react';
import { Layout } from 'react-talend-components';

import AppHeaderBar from '../AppHeaderBar';
import List from '../List';
import SidePanel from '../SidePanel';

function getContent(Component, props) {
	if (React.isValidElement(props)) {
		return props;
	}
	return (<Component {...props} />);
}

function HomeListView({ sidepanel, list, header, children }) {
	if (!sidepanel || !list) {
		return null;
	}
	let drawers = children || [];
	if (!Array.isArray(drawers)) {
		drawers = [drawers];
	}

	return (
		<Layout
			mode="TwoColumns"
			header={getContent(AppHeaderBar, header)}
			one={getContent(SidePanel, sidepanel)}
			drawers={drawers}
		>
			{getContent(List, list)}
		</Layout>
	);
}

HomeListView.displayName = 'HomeListView';
HomeListView.propTypes = {
	header: PropTypes.oneOfType([
		PropTypes.element,
		PropTypes.object,
	]),
	sidepanel: PropTypes.oneOfType([
		PropTypes.element,
		PropTypes.object,
	]).isRequired,
	list: PropTypes.oneOfType([
		PropTypes.element,
		PropTypes.object,
	]).isRequired,
	children: PropTypes.node,
};

export default HomeListView;
