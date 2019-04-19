import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import { translate } from 'react-i18next';

import I18N_DOMAIN_COMPONENTS from '../constants';
import '../translate';
import Icon from '../Icon';
import Action from '../Actions/Action';
import ActionList from '../ActionList';
import Inject from '../Inject';
import theme from './SidePanel.scss';

/**
 * This component aims to display links as a menu.
 * @param {object} props react props
 *
 @example
 const actions = [
 { label: 'Preparations', icon: 'fa fa-asterisk', onClick: action('Preparations clicked') },
 { label: 'Datasets', icon: 'fa fa-file-excel-o', onClick: action('Datasets clicked') },
 { label: 'Favorites', icon: 'fa fa-star', onClick: action('Favorites clicked') }
 ];
 <SidePanel
 actions={ actions }
 docked={ isDocked }
 selected= { selectedItem }
 onToggleDock={ action('Toggle dock clicked') }
 onSelect={ action('onItemSelect') }
 />
 *
 */
function SidePanel({
	id,
	selected,
	onSelect,
	actions,
	getComponent,
	components,
	docked,
	reverse,
	large,
	dockable,
	onToggleDock,
	t,
}) {
	const injected = Inject.all(getComponent, components);
	const normal = !docked && !large && !reverse;
	const navCSS = classNames(theme['tc-side-panel'], 'tc-side-panel', {
		[theme.normal]: normal,
		docked,
		[theme.docked]: docked,
		large,
		[theme.large]: large,
		reverse,
		[theme.reverse]: reverse,
	});
	const listCSS = classNames(theme['tc-side-panel-list'], 'tc-side-panel-list', {
		normal,
		[theme.normalList]:normal,
		docked,
		[theme.dockedList]:docked,
		large,
		[theme.largeList]:large,
		reverse,
		[theme.reverseList]:reverse,
	});
	console.log('....'+ listCSS);
	const toggleCss = classNames(theme['toggle-btn'], 'toggle-btn',{
		[theme.normalToggle]: normal,
		[theme.dockedToggle]: docked,
		[theme.largeToggle]: large,
		[theme.reverseToggle]: reverse,
	});
	const expandLabel = t('SIDEPANEL_EXPAND', { defaultValue: 'Expand menu' });
	const collapseTitle = t('SIDEPANEL_COLLAPSE', { defaultValue: 'Collapse menu' });
	const toggleButtonTitle = docked ? expandLabel : collapseTitle;
	const Components = Inject.getAll(getComponent, { Action, ActionList, Icon });
	return (
		<nav id={id} className={navCSS} role="navigation" aria-expanded={!(dockable && docked)}>
			{dockable && (
                <Components.Action
                    id={id && `${id}-toggle-dock`}
                    bsStyle="link"
                    className={toggleCss}
                    onClick={onToggleDock}
                    icon="talend-opener"
                    aria-controls={id}
                    label={toggleButtonTitle}
                    tooltipPlacement="right"
                    hideLabel
                />
			)}
			{injected('before-actions')}
			{actions && (
				<Components.ActionList
					className={listCSS}
					onSelect={onSelect}
					selected={selected}
					actions={actions}
					id={id}
					isNav
				/>
			)}
			{injected('actions')}
		</nav>
	);
}

SidePanel.displayName = 'SidePanel';

SidePanel.defaultProps = {
	actions: [],
	reverse: false,
	large: false,
	dockable: true,
};

if (process.env.NODE_ENV !== 'production') {
	const actionPropType = PropTypes.shape({
		id: PropTypes.string,
		active: PropTypes.bool,
		icon: PropTypes.string,
		key: PropTypes.string,
		label: PropTypes.string,
		onClick: PropTypes.func,
	});

	SidePanel.propTypes = {
		id: PropTypes.string,
		actions: PropTypes.arrayOf(actionPropType),
		components: PropTypes.object,
		getComponent: PropTypes.func,
		onSelect: PropTypes.func,
		onToggleDock: PropTypes.func,
		docked: PropTypes.bool,
		reverse: PropTypes.bool,
		large: PropTypes.bool,
		dockable: PropTypes.bool,
		selected: actionPropType,
		t: PropTypes.func,
	};
}

export default translate(I18N_DOMAIN_COMPONENTS)(SidePanel);
