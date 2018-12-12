import PropTypes from 'prop-types';
import React from 'react';
import { Inject, Layout, HeaderBar, SidePanel } from '@talend/react-components';
import DatasetList from '../DatasetList';

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

function DatasetHomeListView({ getComponent, components, sidepanel, header, children }) {
	let drawers = children || [];
	if (!Array.isArray(drawers)) {
		drawers = wrapChildren(drawers);
	}
	if (components && components.drawers) {
		drawers = drawers.concat(Inject.map(getComponent, components.drawers));
	}
	const Renderers = Inject.getAll(getComponent, { HeaderBar, SidePanel });
	return (
		<Layout
			id={'listdataset'}
			hasTheme
			mode="TwoColumns"
			header={getContent(Renderers.HeaderBar, header)}
			one={getContent(Renderers.SidePanel, sidepanel)}
			drawers={drawers}
		>
			<DatasetList collectionId={'datasets'} />
		</Layout>
	);
}

DatasetHomeListView.displayName = 'DatasetHomeListView';
DatasetHomeListView.propTypes = {
	getComponent: PropTypes.func,
	components: PropTypes.object,
	header: PropTypes.oneOfType([PropTypes.element, PropTypes.object]),
	sidepanel: PropTypes.oneOfType([PropTypes.element, PropTypes.object]).isRequired,
	list: PropTypes.oneOfType([PropTypes.element, PropTypes.object]).isRequired,
	children: PropTypes.node,
};

export default DatasetHomeListView;
