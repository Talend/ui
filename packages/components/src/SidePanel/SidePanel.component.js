import { createRef, useEffect, useLayoutEffect, useState } from 'react';
import { withTranslation } from 'react-i18next';

import classNames from 'classnames';
import PropTypes from 'prop-types';
import 'simplebar';
import 'simplebar-react/dist/simplebar.min.css';

import tokens from '@talend/design-tokens';

import ActionList from '../ActionList';
import Action from '../Actions/Action';
import I18N_DOMAIN_COMPONENTS from '../constants';
import Inject from '../Inject';
import '../translate';

import theme from './SidePanel.module.scss';

const DOCKED_MIN_WIDTH = '3.75rem';
const LARGE_DOCKED_MIN_WIDTH = '4.375rem';

function getInitialWidth(docked, large) {
	if (docked && large) {
		return LARGE_DOCKED_MIN_WIDTH;
	} else if (docked) {
		return DOCKED_MIN_WIDTH;
	}
	return undefined;
}

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
	backgroundIcon,
	id,
	selected,
	onSelect,
	actions,
	getComponent,
	components,
	docked: dockedProp,
	reverse,
	minimised,
	large,
	dockable,
	onToggleDock,
	t,
}) {
	const [dockState, setDockState] = useState(dockedProp);
	const docked = onToggleDock ? dockedProp : dockState;
	const [width, setWidth] = useState(() => getInitialWidth(docked, large));
	const [animation, setAnimation] = useState(false);
	const ref = createRef();

	useLayoutEffect(() => {
		if (docked || minimised) {
			setWidth(large ? LARGE_DOCKED_MIN_WIDTH : DOCKED_MIN_WIDTH);
		} else if (ref) {
			const actionList = ref.current.querySelector('.tc-action-list');
			setWidth(actionList.offsetWidth);
		}
	}, [ref, docked, minimised, large]);

	useEffect(() => {
		// animation is disabled at first to avoid the panel to be animated at first render
		// when the width is initialized, then we enable animation
		if (!animation && width) {
			setAnimation(true);
		}
	}, [animation, width]);

	const onToggle = (...args) => {
		if (onToggleDock) {
			onToggleDock(...args);
		} else {
			setDockState(!dockState);
		}
	};

	const injected = Inject.all(getComponent, components);
	const navCSS = classNames(theme['tc-side-panel'], 'tc-side-panel', {
		docked,
		[theme.docked]: docked || minimised,
		large,
		[theme.large]: large,
		reverse,
		[theme.reverse]: reverse,
		[theme.animate]: animation,
	});
	const listCSS = classNames(theme['tc-side-panel-list'], 'tc-side-panel-list');

	const expandLabel = t('SIDEPANEL_EXPAND', { defaultValue: 'Expand menu' });
	const collapseTitle = t('SIDEPANEL_COLLAPSE', { defaultValue: 'Collapse menu' });
	const toggleButtonTitle = docked ? expandLabel : collapseTitle;
	const Components = Inject.getAll(getComponent, { Action, ActionList });
	return (
		<nav id={id} className={navCSS} role="navigation" ref={ref} style={{ width }}>
			{backgroundIcon && (
				<style>
					{`#${id}::before {
						content: '';
						position: absolute;
						left: 0;
						bottom: -50px;
						height: 19.375rem;
						width: 19.375rem;
						background-repeat: no-repeat;
						opacity: 0.1;
						background-color: ${tokens.coralColorBrandIcon};
						mask-image: url('${backgroundIcon}');
						-webkit-mask-image: url('${backgroundIcon}');
				}`}
				</style>
			)}
			{dockable && !minimised && (
				<div className={classNames(theme['toggle-btn'], 'tc-side-panel-toggle-btn')}>
					<Components.Action
						id={id && `${id}-toggle-dock`}
						bsStyle="link"
						onClick={onToggle}
						icon="talend-opener"
						aria-controls={id}
						label={toggleButtonTitle}
						tooltipPlacement="right"
						hideLabel
					/>
				</div>
			)}
			{injected('before-actions')}
			{actions && (
				<div
					data-simplebar
					className={classNames(
						theme['action-list-container'],
						'tc-side-panel-action-list-container',
					)}
				>
					<Components.ActionList
						className={listCSS}
						onSelect={onSelect}
						selected={selected}
						actions={actions}
						reverse={!reverse}
						id={id}
						isNav
					/>
				</div>
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
	minimised: false,
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
		backgroundIcon: PropTypes.string,
		actions: PropTypes.arrayOf(actionPropType),
		components: PropTypes.object,
		getComponent: PropTypes.func,
		onSelect: PropTypes.func,
		onToggleDock: PropTypes.func,
		docked: PropTypes.bool,
		reverse: PropTypes.bool,
		large: PropTypes.bool,
		dockable: PropTypes.bool,
		minimised: PropTypes.bool,
		selected: actionPropType,
		t: PropTypes.func,
	};
}

export default withTranslation(I18N_DOMAIN_COMPONENTS)(SidePanel);
