import PropTypes from 'prop-types';
import React from 'react';
import get from 'lodash/get';
import omit from 'lodash/omit';
import { CSSTransition, transit } from 'react-css-transition';
import classnames from 'classnames';
import ActionBar from '../ActionBar';
import Action from '../Actions/Action';
import TabBar from '../TabBar';
import Inject from '../Inject';
import ActionIconToggle from '../Actions/ActionIconToggle';

import theme from './Drawer.scss';

const DEFAULT_TRANSITION_DURATION = 350;

class DrawerAnimation extends React.Component {
	constructor(props) {
		super(props);
		this.handleTransitionComplete = this.handleTransitionComplete.bind(this);
		this.state = { transitioned: false };
	}

	handleTransitionComplete() {
		this.props.onTransitionComplete();
		this.setState({ transitioned: true });
	}

	render() {
		const { children, withTransition, ...rest } = this.props;
		const transitionDuration = withTransition ? DEFAULT_TRANSITION_DURATION : 0;
		return (
			<CSSTransition
				{...rest}
				onTransitionComplete={this.handleTransitionComplete}
				defaultStyle={{ transform: 'translateX(100%)' }}
				enterStyle={{ transform: transit('translateX(0%)', transitionDuration, 'ease-in-out') }}
				leaveStyle={{ transform: transit('translateX(100%)', transitionDuration, 'ease-in-out') }}
			>
				{React.cloneElement(children, this.state)}
			</CSSTransition>
		);
	}
}

DrawerAnimation.propTypes = {
	children: PropTypes.node,
	withTransition: PropTypes.bool,
	onTransitionComplete: PropTypes.func,
};
DrawerAnimation.defaultProps = {
	withTransition: true,
	onTransitionComplete: () => {},
};

function DrawerContainer({ stacked, className, children, withTransition = true, ...rest }) {
	const drawerContainerClasses = classnames(
		theme['tc-drawer'],
		className,
		'tc-drawer',
		{
			[theme['tc-drawer-transition']]: withTransition,
			'tc-drawer-transition': withTransition,
		},
		{
			[theme['drawer-stacked']]: stacked,
			stacked,
		},
	);
	return (
		<div className={drawerContainerClasses} {...rest}>
			<div className={classnames('tc-drawer-container', theme['tc-drawer-container'])}>
				{children}
			</div>
		</div>
	);
}

DrawerContainer.propTypes = {
	stacked: PropTypes.bool,
	withTransition: PropTypes.bool,
	className: PropTypes.string,
	children: PropTypes.node.isRequired,
};

export function cancelActionComponent(onCancelAction, getComponent) {
	if (!onCancelAction) {
		return null;
	}

	const ActionComponent = Inject.get(getComponent, 'Action', Action);
	const enhancedCancelAction = Object.assign(
		{
			icon: 'talend-cross',
			hideLabel: true,
			link: true,
		},
		onCancelAction,
	);
	return <ActionComponent className={theme['tc-drawer-close-action']} {...enhancedCancelAction} />;
}

export function subtitleComponent(subtitle) {
	if (!subtitle || !subtitle.length) {
		return null;
	}
	return <h2 title={subtitle}>{subtitle}</h2>;
}

export function actionIconComponent(actionIcon) {
	if (!actionIcon) {
		return null;
	}
	return (
		<ActionIconToggle
			className={classnames('tc-drawer-header-action-icon', theme['tc-drawer-header-action-icon'])}
			{...actionIcon}
		/>
	);
}

function DrawerTitle({ title, subtitle, children, onCancelAction, getComponent, actionIcon }) {
	if (!title) {
		return null;
	}
	return (
		<div className={classnames('tc-drawer-header', theme['tc-drawer-header'])}>
			<div className={classnames('tc-drawer-header-title', theme['tc-drawer-header-title'])}>
				<h1 title={title}>{title}</h1>
				{subtitleComponent(subtitle)}
				{cancelActionComponent(onCancelAction, getComponent)}
				{actionIconComponent(actionIcon)}
			</div>
			<div
				className={classnames('tc-drawer-header-with-tabs', theme['tc-drawer-header-with-tabs'])}
			>
				{children}
			</div>
		</div>
	);
}

DrawerTitle.propTypes = {
	title: PropTypes.string.isRequired,
	subtitle: PropTypes.string,
	onCancelAction: PropTypes.shape(Action.propTypes),
	children: PropTypes.node,
	getComponent: PropTypes.func,
	actionIcon: PropTypes.object,
};

function DrawerContent({ children, className, ...rest }) {
	return (
		<div
			className={classnames('tc-drawer-content', theme['tc-drawer-content'], className)}
			{...rest}
		>
			{children}
		</div>
	);
}

DrawerContent.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
};

function DrawerFooter({ children }) {
	return (
		<div className={classnames('tc-drawer-footer', theme['tc-drawer-footer'])}>{children}</div>
	);
}

DrawerFooter.propTypes = {
	children: PropTypes.node,
};

export function combinedFooterActions(onCancelAction, footerActions, activeTabItem = {}) {
	const enhancedFooterActions = Object.assign({}, omit(footerActions, 'actions'));
	enhancedFooterActions.actions = {};
	['left', 'center', 'right'].forEach(item => {
		enhancedFooterActions.actions[item] = [
			...get(footerActions, `actions.${item}`, []),
			...get(activeTabItem, `actions.${item}`, []),
		];
	});

	if (onCancelAction && !onCancelAction.hideInFooter) {
		enhancedFooterActions.actions.left.unshift(onCancelAction);
	}

	return enhancedFooterActions;
}

function Drawer({
	stacked,
	title,
	className,
	style,
	children,
	footerActions,
	onCancelAction,
	tabs,
	withTransition,
	getComponent,
	selectedTabKey,
}) {
	if (!children) {
		return null;
	}

	const TabBarComponent = Inject.get(getComponent, 'TabBar', TabBar);

	let activeTab = {};
	let activeTabItem = [];
	let customTabs;
	if (tabs && tabs.items.length > 0) {
		customTabs = Object.assign({}, tabs);

		if (selectedTabKey) {
			customTabs.selectedKey = selectedTabKey;
			activeTab = tabs.items.find(tab => tab.key === selectedTabKey);
		}
		activeTabItem = get(activeTab, 'footerActions', {});
	}

	return (
		<DrawerContainer
			stacked={stacked}
			className={className}
			style={style}
			withTransition={withTransition}
		>
			<DrawerTitle title={title} onCancelAction={onCancelAction} getComponent={getComponent} />
			{tabs && (
				<div className={classnames('tc-drawer-tabs-container', theme['tc-drawer-tabs-container'])}>
					<TabBarComponent
						{...customTabs}
						className={classnames('tc-drawer-tabs', theme['tc-drawer-tabs'])}
					/>
				</div>
			)}
			<div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, overflow: 'hidden' }}>
				<DrawerContent>{children}</DrawerContent>
				<div
					className={classnames(
						'tc-drawer-actionbar-container',
						theme['tc-drawer-actionbar-container'],
					)}
				>
					<ActionBar
						{...combinedFooterActions(onCancelAction, footerActions, activeTabItem)}
						className={classnames('tc-drawer-actionbar', theme['tc-drawer-actionbar'])}
					/>
				</div>
			</div>
		</DrawerContainer>
	);
}

Drawer.displayName = 'Drawer';

Drawer.propTypes = {
	stacked: PropTypes.bool,
	title: PropTypes.string,
	children: PropTypes.node,
	style: PropTypes.object, // eslint-disable-line react/forbid-prop-types
	className: PropTypes.string,
	// footer action, see action bar for api
	footerActions: PropTypes.shape(ActionBar.propTypes).isRequired,
	onCancelAction: PropTypes.shape(Action.propTypes),
	tabs: PropTypes.shape(TabBar.propTypes),
	withTransition: PropTypes.bool,
	getComponent: PropTypes.func,
	selectedTabKey: PropTypes.string,
};

Drawer.defaultProps = {
	withTransition: true,
};

Drawer.Animation = DrawerAnimation;
Drawer.Container = DrawerContainer;
Drawer.Title = DrawerTitle;
Drawer.Content = DrawerContent;
Drawer.Footer = DrawerFooter;
Drawer.FooterStyle = theme['tc-drawer-footer'];

export default Drawer;
