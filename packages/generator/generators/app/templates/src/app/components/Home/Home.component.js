import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Layout from '@talend/react-components/lib/Layout';
import HeaderBar from '@talend/react-components/lib/HeaderBar';
import SidePanel from '@talend/react-components/lib/SidePanel';

import PokemonList from '../PokemonList';
<%-props.i18n ? `
import I18nInstructions from '../I18nInstructions';` : ''
%>
<%-props.cmf ? `
import DatasetList from '../DatasetList';` : ''
%>
import HomeService from '../../services/home';

function Home({ isSidePanelDocked, toggleSidePanel }) {
	const [selectedMenu, setSelectedMenu] = useState('pokemons');

	const header = (
		<HeaderBar logo={{ isFull: true }} brand={{ label: 'Talend app', isSeparated: true }} />
	);
	const menus = [
		{ icon: 'talend-user-circle', label: 'Pokemons', key: 'pokemons' },<%-
		props.i18n ? `
		{ icon: 'talend-world', label: 'i18n', key: 'i18n' },` : ''%><%-
		props.cmf ? `
		{ icon: 'talend-cluster', label: 'Injection', key: 'injection' },` : ''%>
	];
	const sidePanel = (
		<SidePanel
			actions={menus}
			onToggleDock={toggleSidePanel}
			docked={isSidePanelDocked}
			onSelect={(event, element) => setSelectedMenu(element.key)}
		/>
	);

	return (
		<Layout mode="TwoColumns" header={header} one={sidePanel}>
			{selectedMenu === 'pokemons' ? <PokemonList /> : null}<%-
			props.i18n ? `
			{selectedMenu === 'i18n' ? <I18nInstructions /> : null}` : '' %><%-
			props.cmf ? `
			{selectedMenu === 'injection' ? <DatasetList /> : null}` : '' %>
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
