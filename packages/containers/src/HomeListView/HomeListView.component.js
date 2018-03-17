import PropTypes from 'prop-types';
import React from 'react';
import { Inject, Layout, HeaderBar } from '@talend/react-components';

import List from '../List';
import SidePanel from '../SidePanel';

function getContent(Component, props) {
	if (React.isValidElement(props)) {
		return props;
	}
	return <Component {...props} />;
}

function HomeListView({ getComponent, id, hasTheme, sidepanel, list, header, children }) {
	if (!sidepanel || !list) {
		return null;
	}
	const Renderers = Inject.getAll(getComponent, { HeaderBar, SidePanel, List });

	return (
		<Layout
			id={id}
			hasTheme={hasTheme}
			mode="TwoColumns"
			header={getContent(Renderers.HeaderBar, header)}
			one={getContent(Renderers.SidePanel, sidepanel)}
			drawers={children}
		>
			{getContent(Renderers.List, list)}
		</Layout>
	);
}

HomeListView.displayName = 'HomeListView';
HomeListView.propTypes = {
	getComponent: PropTypes.func,
	id: PropTypes.string,
	hasTheme: PropTypes.bool,
	header: PropTypes.oneOfType([PropTypes.element, PropTypes.object]),
	sidepanel: PropTypes.oneOfType([PropTypes.element, PropTypes.object]).isRequired,
	list: PropTypes.oneOfType([PropTypes.element, PropTypes.object]).isRequired,
	children: PropTypes.node,
};

export default HomeListView;
