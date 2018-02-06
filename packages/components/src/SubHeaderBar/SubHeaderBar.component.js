import has from 'lodash/has';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { translate } from 'react-i18next';
import I18N_DOMAIN_COMPONENTS from '../constants';
import { DEFAULT_I18N, getDefaultTranslate } from '../translate';
import { Action } from '../Actions';
import ActionBar from '../ActionBar';
import InputTitleSubHeader from './InputTitleSubHeader';
import Inject from '../Inject';
import theme from './SubHeaderBar.scss';

function SubHeaderBarActions({ children, tag, left, right, center, hasRight }) {
	const className = classNames({
		'subheader-left': left,
		'subheader-center': center,
		'subheader-right': right,
		[theme['tc-subheader-navbar-left']]: left,
		[theme['tc-subheader-navbar-right']]: right,
		[theme['tc-subheader-navbar-center']]: center,
		[theme['tc-subheader-navbar-center-no-margin-right']]: hasRight,
		'tc-subheader-navbar-center-no-margin-right': hasRight,
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

function CustomInject({ getComponent, left, right, center, nowrap, ...props }) {
	if (nowrap) {
		return <Inject getComponent={getComponent} {...props} />;
	}
	return (
		<SubHeaderBarActions left={left} right={right} center={center}>
			<Inject getComponent={getComponent} {...props} />
		</SubHeaderBarActions>
	);
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
	children,
	left,
	center,
	right,
	...rest
}) {
	const injected = Inject.all(getComponent, components, CustomInject);
	const Components = Inject.getAll(getComponent, { Action, ActionBar });
	const hasRight =
		Array.isArray(right) || has(components, 'before-right') || has(components, 'after-right');
	return (
		<header className={classNames(theme['tc-subheader'], 'tc-subheader', className)}>
			{injected('before-actionbar')}
			<Components.ActionBar
				className={classNames(theme['tc-subheader-navbar'], 'tc-subheader-navbar')}
			>
				{injected('before-left')}
				<SubHeaderBarActions left>
					{injected('before-back')}
					{onGoBack && (
						<Components.Action
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
					<InputTitleSubHeader t={t} {...rest} />
					{injected('after-title')}
				</SubHeaderBarActions>
				{Array.isArray(left) && (
					<SubHeaderBarActions left>
						{left.map((item, index) => <Components.Action key={index} {...item} />)}
					</SubHeaderBarActions>
				)}
				{children}
				{injected('before-center')}
				{Array.isArray(center) &&
					center.map((item, index) => (
						<SubHeaderBarActions center hasRight={hasRight}>
							<Components.Action key={index} {...item} />
						</SubHeaderBarActions>
					))}
				{injected('before-right')}
				{Array.isArray(right) &&
					right.map((item, index) => (
						<SubHeaderBarActions
							className={classNames(
								theme['tc-subheader-navbar-right'],
								'tc-subheader-navbar-right',
							)}
							left={false}
							center={false}
							right
						>
							<Components.Action key={index} {...item} />
						</SubHeaderBarActions>
					))}
				{injected('after-right')}
			</Components.ActionBar>
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
	children: PropTypes.node,
	...Inject.PropTypes,
};

SubHeaderBar.defaultProps = {
	t: getDefaultTranslate,
};
SubHeaderBar.Content = SubHeaderBarActions;

export default translate(I18N_DOMAIN_COMPONENTS, { i18n: DEFAULT_I18N })(SubHeaderBar);
export { SubHeaderBar, SubHeaderBarActions, CustomInject };
