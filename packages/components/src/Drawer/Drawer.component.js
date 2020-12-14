import PropTypes from 'prop-types';
import React from 'react';
import get from 'lodash/get';
import omit from 'lodash/omit';
import noop from 'lodash/noop';
import { Transition } from 'react-transition-group';
import classnames from 'classnames';
import ActionBar from '../ActionBar';
import Action from '../Actions/Action';
import TabBar from '../TabBar';
import Inject from '../Inject';
import EditableText from '../EditableText';
import { getTheme } from '../theme';

import theme from './Drawer.scss';

const css = getTheme(theme);
const DEFAULT_TRANSITION_DURATION = 350;

const STYLES = {
	entering: { transform: 'translateX(0%)' },
	entered: { transform: 'translateX(0%)' },
	exiting: { transform: 'translateX(100%)' },
	exited: { transform: 'translateX(100%)' },
};

function DrawerAnimation(props) {
	const { children, withTransition, ...rest } = props;
	const timeout = withTransition ? DEFAULT_TRANSITION_DURATION : 0;

	return (
		<Transition in appear timeout={withTransition ? 500 : 0} {...rest}>
			{transitionState => {
				const style = {
					transition: `transform ${timeout}ms ease-in-out`,
					transform: 'translateX(100%)',
					...STYLES[transitionState],
				};
				return React.cloneElement(children, { style, transitioned: transitionState === 'entered' });
			}}
		</Transition>
	);
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
	const drawerContainerClasses = css(
		className,
		'tc-drawer',
		{
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
	const enhancedCancelAction = {
		icon: 'talend-cross',
		hideLabel: true,
		link: true,
		...onCancelAction,
	};
	return (
		<ActionComponent
			{...enhancedCancelAction}
			className={css('tc-drawer-close-action', enhancedCancelAction.className)}
			tooltipClassName={theme['drawer-close-action-tooltip']}
		/>
	);
}

export function SubtitleComponent({ subtitle }) {
	if (!subtitle || !subtitle.length) {
		return null;
	}
	return <h2 title={subtitle}>{subtitle}</h2>;
}

SubtitleComponent.propTypes = {
	subtitle: PropTypes.string,
};

export function subtitleComponent(subtitle) {
	// backward compatibility
	return <SubtitleComponent subtitle={subtitle} />;
}

function DrawerTitle({
	title,
	subtitle,
	children,
	onCancelAction,
	getComponent,
	editable,
	inProgress,
	onEdit,
	onSubmit,
	onCancel,
	renderTitleActions = noop,
	...props
}) {
	const [isEditMode, setIsEditMode] = React.useState(false);
	function handleEdit(...args) {
		setIsEditMode(true);
		if (onEdit) {
			onEdit(...args);
		}
	}
	function handleCancel(...args) {
		setIsEditMode(false);
		if (onCancel) {
			onCancel(...args);
		}
	}
	function handleSubmit(...args) {
		setIsEditMode(false);
		if (onSubmit) {
			onSubmit(...args);
		}
	}

	if (!title && !children) {
		return null;
	}
	const InjectedEditableText = Inject.get(getComponent, 'EditableText', EditableText);
	return (
		<div className={css('tc-drawer-header')}>
			<div className={css('tc-drawer-header-title')}>
				{!editable ? (
					<h1 title={title}>{title}</h1>
				) : (
					<InjectedEditableText
						text={title}
						inProgress={inProgress}
						feature="drawertitle.rename"
						componentClass="h1"
						onEdit={handleEdit}
						onCancel={handleCancel}
						onSubmit={handleSubmit}
						editMode={isEditMode}
						{...props}
					/>
				)}
				{!isEditMode ? <SubtitleComponent subtitle={subtitle} /> : null}
				{renderTitleActions()}
				{cancelActionComponent(onCancelAction, getComponent)}
			</div>
			<div className={css('tc-drawer-header-with-tabs')}>{children}</div>
		</div>
	);
}

DrawerTitle.propTypes = {
	title: PropTypes.string.isRequired,
	subtitle: PropTypes.string,
	onCancelAction: PropTypes.shape(Action.propTypes),
	children: PropTypes.node,
	getComponent: PropTypes.func,
	renderTitleActions: PropTypes.func,
	editable: PropTypes.bool,
	inProgress: PropTypes.bool,
	onEdit: PropTypes.func,
	onSubmit: PropTypes.func,
	onCancel: PropTypes.func,
};

function DrawerContent({ children, className, ...rest }) {
	return (
		<div className={css('tc-drawer-content', className)} {...rest}>
			<div className={css('tc-drawer-content-wrapper')}>{children}</div>
		</div>
	);
}

DrawerContent.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
};

function DrawerFooter({ children }) {
	return <div className={css('tc-drawer-footer')}>{children}</div>;
}

DrawerFooter.propTypes = {
	children: PropTypes.node,
};

export function combinedFooterActions(onCancelAction, footerActions, activeTabItem = {}) {
	const enhancedFooterActions = { ...omit(footerActions, 'actions') };
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
	editableTitle,
	renderTitleActions,
}) {
	if (!children) {
		return null;
	}

	const TabBarComponent = Inject.get(getComponent, 'TabBar', TabBar);

	let activeTab = {};
	let activeTabItem = [];
	let customTabs;
	if (tabs && tabs.items.length > 0) {
		customTabs = {
			...tabs,
			items: tabs.items && tabs.items.map(({ footerActions, ...item }) => item),
		};

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
			<DrawerTitle
				renderTitleActions={renderTitleActions}
				editable={editableTitle}
				title={title}
				onCancelAction={onCancelAction}
				getComponent={getComponent}
			/>
			{tabs && (
				<div className={css('tc-drawer-tabs-container')}>
					<TabBarComponent {...customTabs} className={css('tc-drawer-tabs')} />
				</div>
			)}
			<div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, overflow: 'hidden' }}>
				<DrawerContent>{children}</DrawerContent>
				<div className={css('tc-drawer-actionbar-container')}>
					<ActionBar
						{...combinedFooterActions(onCancelAction, footerActions, activeTabItem)}
						className={css('tc-drawer-actionbar')}
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
	editableTitle: PropTypes.bool,
	children: PropTypes.node,
	style: PropTypes.object, // eslint-disable-line react/forbid-prop-types
	className: PropTypes.string,
	// footer action, see action bar for api
	footerActions: PropTypes.shape(ActionBar.propTypes),
	onCancelAction: PropTypes.shape(Action.propTypes),
	tabs: PropTypes.shape(TabBar.propTypes),
	withTransition: PropTypes.bool,
	renderTitleActions: PropTypes.func,
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
