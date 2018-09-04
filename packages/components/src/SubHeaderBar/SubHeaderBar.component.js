import has from 'lodash/has';
import omit from 'lodash/omit';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { translate } from 'react-i18next';
import I18N_DOMAIN_COMPONENTS from '../constants';
import getDefaultT from '../translate';
import { Action } from '../Actions';
import ActionBar from '../ActionBar';
import TitleSubHeader from './TitleSubHeader';
import Inject from '../Inject';
import Skeleton from '../Skeleton';
import theme from './SubHeaderBar.scss';

function SubHeaderBarActions({ children, tag, left, right, center, hasRight }) {
	const className = classNames({
		'tc-subheader-left': left,
		'tc-subheader-center': center,
		'tc-subheader-right': right,
		'tc-subheader-right-no-margin-right': hasRight,
		[theme['tc-subheader-navbar-left']]: left,
		[theme['tc-subheader-navbar-center']]: center,
		[theme['tc-subheader-navbar-center-no-margin-right']]: hasRight,
		[theme['tc-subheader-navbar-right']]: right,
	});
	return (
		<div className={className}>
			<ActionBar.Content tag={tag} left={left} center={center} right={right}>
				{children}
			</ActionBar.Content>
		</div>
	);
}

SubHeaderBarActions.propTypes = {
	children: PropTypes.node,
	tag: PropTypes.string,
	right: PropTypes.bool,
	center: PropTypes.bool,
	left: PropTypes.bool,
	hasRight: PropTypes.bool,
};

function CustomInject(props) {
	// These (omitted) props have been used in previous
	// implementation for the __wrappers__ of the injected components
	// If we don't omit them they will be passed to the injected components
	// That would be a __breaking change__
	return <Inject {...omit(props, ['left', 'right', 'center', 'nowrap'])} />;
}
CustomInject.propTypes = {
	nowrap: PropTypes.bool,
	right: PropTypes.bool,
	center: PropTypes.bool,
	left: PropTypes.bool,
	getComponent: PropTypes.func,
};

function SubHeaderBar({
	t,
	onGoBack,
	components,
	getComponent,
	className,
	left,
	center,
	right,
	rightActionsLoading,
	...rest
}) {
	const injected = Inject.all(getComponent, components, CustomInject);
	const Renderer = Inject.getAll(getComponent, { Action, ActionBar });
	const hasRight =
		Array.isArray(right) || has(components, 'before-right') || has(components, 'after-right');
	let rightActions;

	if (rightActionsLoading) {
		rightActions = (
			<SubHeaderBarActions
				className={classNames(theme['tc-subheader-navbar-right'], 'tc-subheader-navbar-right')}
				right
			>
				<Skeleton type={Skeleton.TYPES.text} size={Skeleton.SIZES.large} />
			</SubHeaderBarActions>
		);
	} else {
		rightActions =
			Array.isArray(right) &&
			right.map((item, index) => (
				<SubHeaderBarActions
					className={classNames(theme['tc-subheader-navbar-right'], 'tc-subheader-navbar-right')}
					key={index}
					right
				>
					<Renderer.Action key={index} {...item} />
				</SubHeaderBarActions>
			));
	}

	return (
		<header className={classNames(theme['tc-subheader'], 'tc-subheader', className)}>
			{injected('before-actionbar')}
			<Renderer.ActionBar
				className={classNames(theme['tc-subheader-navbar'], 'tc-subheader-navbar')}
			>
				<SubHeaderBarActions left>
					{injected('left')}
					{injected('before-back')}
					{onGoBack && (
						<Renderer.Action
							id="backArrow"
							onClick={onGoBack}
							label={t('BACK_ARROW_TOOLTIP', { defaultValue: 'Go Back' })}
							icon="talend-arrow-left"
							bsStyle="link"
							className={classNames(theme['tc-subheader-back-button'], 'tc-subheader-back-button')}
							hideLabel
						/>
					)}
					{injected('before-title')}
					<TitleSubHeader t={t} getComponent={getComponent} {...rest} />
					{injected('after-title')}
					{Array.isArray(left) &&
						left.map((item, index) => <Renderer.Action key={index} {...item} />)}
				</SubHeaderBarActions>
				<SubHeaderBarActions center hasRight={hasRight}>
					{injected('center')}
					{Array.isArray(center) &&
						center.map((item, index) => <Renderer.Action key={index} {...item} />)}
				</SubHeaderBarActions>
				<SubHeaderBarActions
					className={classNames(theme['tc-subheader-navbar-right'], 'tc-subheader-navbar-right')}
					right
				>
					{injected('right')}
					{Array.isArray(right) &&
						right.map((item, index) => <Renderer.Action key={index} {...item} />)}
					{injected('after-right')}
				</SubHeaderBarActions>
			</Renderer.ActionBar>
			{injected('after-actionbar')}
		</header>
	);
}

SubHeaderBar.displayName = 'SubHeaderBar';

SubHeaderBar.propTypes = {
	onGoBack: PropTypes.func.isRequired,
	className: PropTypes.string,
	t: PropTypes.func,
	left: PropTypes.array,
	right: PropTypes.array,
	center: PropTypes.array,
	inProgress: PropTypes.bool,
	rightActionsLoading: PropTypes.bool,
	...Inject.PropTypes,
};

SubHeaderBar.defaultProps = {
	t: getDefaultT(),
};
SubHeaderBar.Content = SubHeaderBarActions;

export default translate(I18N_DOMAIN_COMPONENTS)(SubHeaderBar);
export { SubHeaderBar, SubHeaderBarActions, CustomInject };
