import PropTypes from 'prop-types';
import React from 'react';
import Inject from '@talend/react-components/lib/Inject';
import Layout from '@talend/react-components/lib/Layout';
import HeaderBar from '@talend/react-components/lib/HeaderBar';

import List from '../List';
import SidePanel from '../SidePanel';

function getContent(Component, props) {
	if (React.isValidElement(props)) {
		return props;
	}
	return <Component {...props} />;
}

function wrapChildren(children) {
	if (children && children.props && children.props.children) {
		return [children, ...wrapChildren(children.props.children)];
	} else if (children && !children.props) {
		// this happens ony in tests with enzyme's mount
		return [];
	}
	return [children];
}

function HomeListView({
	getComponent,
	components,
	id,
	hasTheme,
	sidepanel,
	list,
	header,
	children,
}) {
	if (!sidepanel || !list) {
		return null;
	}
	let drawers = children || [];
	if (!Array.isArray(drawers)) {
		drawers = wrapChildren(drawers);
	}
	if (components && components.drawers) {
		drawers = drawers.concat(Inject.map(getComponent, components.drawers));
	}
	const Renderers = Inject.getAll(getComponent, { HeaderBar, SidePanel, List });

	return (
		<Layout
			id={id}
			hasTheme={hasTheme}
			mode="TwoColumns"
			header={getContent(Renderers.HeaderBar, header)}
			one={getContent(Renderers.SidePanel, sidepanel)}
			drawers={drawers}
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
	components: PropTypes.object,
	header: PropTypes.oneOfType([PropTypes.element, PropTypes.object]),
	sidepanel: PropTypes.oneOfType([PropTypes.element, PropTypes.object]).isRequired,
	list: PropTypes.oneOfType([PropTypes.element, PropTypes.object]).isRequired,
	children: PropTypes.node,
};

export default HomeListView;
