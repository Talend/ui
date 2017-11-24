import PropTypes from 'prop-types';
import React from 'react';
import { CSSTransition, transit } from 'react-css-transition';
import classnames from 'classnames';
import ActionBar from '../ActionBar';
import Action from '../Actions/Action';
import TabBar from '../TabBar';

import theme from './Drawer.scss';

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
		const { children, ...rest } = this.props;
		return (
			<CSSTransition
				{...rest}
				onTransitionComplete={this.handleTransitionComplete}
				defaultStyle={{ transform: 'translateX(100%)' }}
				enterStyle={{ transform: transit('translateX(0%)', 350, 'ease-in-out') }}
				leaveStyle={{ transform: transit('translateX(100%)', 350, 'ease-in-out') }}
				activeStyle={{ transform: 'translateX(0%)' }}
			>
				{React.cloneElement(children, this.state)}
			</CSSTransition>
		);
	}

}

DrawerAnimation.propTypes = {
	children: PropTypes.node,
	onTransitionComplete: PropTypes.func,
};
DrawerAnimation.defaultProps = {
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
		});
	return (
		<div className={drawerContainerClasses} {...rest}>
			<div className={`tc-drawer-container ${theme['tc-drawer-container']}`}>
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

export function cancelActionComponent(onCancelAction) {
	if (!onCancelAction) {
		return null;
	}
	const enhancedCancelAction = Object.assign({
		icon: 'talend-cross',
		hideLabel: true,
		link: true,
	}, onCancelAction);
	return <Action className={theme['tc-drawer-close-action']} {...enhancedCancelAction} />;
}

export function subtitleComponent(subtitle) {
	if (!subtitle || !subtitle.length) {
		return null;
	}
	return <h2 title={subtitle}>{subtitle}</h2>;
}

function DrawerTitle({ title, subtitle, children, onCancelAction }) {
	if (!title) {
		return null;
	}
	return (
		<div className={`tc-drawer-header ${theme['tc-drawer-header']}`}>
			<div className={`tc-drawer-header-title ${theme['tc-drawer-header-title']}`}>
				<h1 title={title}>{title}</h1>
				{subtitleComponent(subtitle)}
				{cancelActionComponent(onCancelAction)}
			</div>
			<div className={`tc-drawer-header-with-tabs ${theme['tc-drawer-header-with-tabs']}`}>
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
};

function DrawerContent({ children, ...rest }) {
	return (
		<div className={`tc-drawer-content ${theme['tc-drawer-content']}`} {...rest}>
			{children}
		</div>
	);
}

DrawerContent.propTypes = {
	children: PropTypes.node,
};

function DrawerFooter({ children }) {
	return (
		<div className={`tc-drawer-footer ${theme['tc-drawer-footer']}`}>
			{children}
		</div>
	);
}

DrawerFooter.propTypes = {
	children: PropTypes.node,
};

function combinedFooterActions(onCancelAction, footerActions) {
	if (!onCancelAction) {
		return footerActions;
	}
	const enhancedFooterActions = Object.assign({}, footerActions);
	if (footerActions && footerActions.actions && footerActions.actions.left) {
		enhancedFooterActions.actions.left.push(onCancelAction);
	} else {
		enhancedFooterActions.actions.left = [].push(onCancelAction);
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
	withTransition = true,
}) {
	if (!children) {
		return null;
	}
	return (
		<DrawerContainer
			stacked={stacked}
			className={className}
			style={style}
			withTransition={withTransition}
		>
			<DrawerTitle title={title} onCancelAction={onCancelAction} />
			{tabs && (
				<div className={theme['tc-drawer-tabs-container']}>
					<TabBar {...tabs} className={theme['tc-drawer-tabs']} />
				</div>
			)}
			<div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, overflow: 'hidden' }}>
				<DrawerContent>
					{children}
				</DrawerContent>
				<div className={theme['tc-drawer-actionbar-container']}>
					<ActionBar
						{...combinedFooterActions(onCancelAction, footerActions)} className={theme['tc-drawer-actionbar']}
					/>
				</div>
			</div>
		</DrawerContainer>
	);
}

Drawer.propTypes = {
	stacked: PropTypes.bool,
	title: PropTypes.string,
	children: PropTypes.node,
	style: PropTypes.object,  // eslint-disable-line react/forbid-prop-types
	className: PropTypes.string,
	// footer action, see action bar for api
	footerActions: PropTypes.shape(ActionBar.propTypes).isRequired,
	onCancelAction: PropTypes.shape(Action.propTypes),
	tabs: PropTypes.shape(TabBar.propTypes),
	withTransition: PropTypes.bool,
};

Drawer.Animation = DrawerAnimation;
Drawer.Container = DrawerContainer;
Drawer.Title = DrawerTitle;
Drawer.Content = DrawerContent;
Drawer.Footer = DrawerFooter;
Drawer.FooterStyle = theme['tc-drawer-footer'];

export default Drawer;
