import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Layout from '@talend/react-components/lib/Layout';
import HeaderBar from '@talend/react-components/lib/HeaderBar';
import SidePanel from '@talend/react-components/lib/SidePanel';

import DatasetList from '../DatasetList';
import HomeService from '../../services/home';

function Home({ isSidePanelDocked, toggleSidePanel }) {
	const header = (
		<HeaderBar logo={{ isFull: true }} brand={{ label: 'Talend app', isSeparated: true }} />
	);
	const sidePanel = (
		<SidePanel
			actions={[{ icon: 'talend-datastore', label: 'Datasets', href: '/' }]}
			onToggleDock={toggleSidePanel}
			docked={isSidePanelDocked}
		/>
	);

	return (
		<Layout mode="TwoColumns" header={header} one={sidePanel}>
			<DatasetList />
		</Layout>
	);
}
Home.propTypes = {
	isSidePanelDocked: PropTypes.bool,
	toggleSidePanel: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
	return {
		isSidePanelDocked: HomeService.selectors.isSidePanelDocked(state),
	};
}

const mapDispatchToProps = {
	toggleSidePanel: HomeService.actionCreators.toggleSidePanel,
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(Home);
