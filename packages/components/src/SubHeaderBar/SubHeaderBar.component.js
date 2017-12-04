import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Action } from '../Actions';
import ActionBar from '../ActionBar';
import theme from './SubHeaderBar.scss';
import InputSubheaderBar from './InputSubheaderBar.component';

function SubHeaderBarActions({ components, right, center, className }) {
	return (
		<div className={className}>
			{components.map((component, index) => (
				<ActionBar.Content key={index} tag={component.tag} center={center} right={right}>
					{component.injectedComponent}
				</ActionBar.Content>
			))}
		</div>
	);
}

SubHeaderBarActions.propTypes = {
	components: PropTypes.array.isRequired,
	right: PropTypes.bool,
	center: PropTypes.bool,
	className: PropTypes.string,
};

function SubHeaderBar({
	onGoBack,
	componentsLeft,
	componentsCenter,
	componentsRight,
	className,
	...rest
}) {
	return (
		<div className={classNames(theme['subheader-container'], 'subheader-container', className)}>
			<ActionBar className={theme['subheader-navbar']}>
				<ActionBar.Content left>
					<Action
						id="backArrow"
						onClick={onGoBack}
						label="backArrow"
						icon="talend-arrow-left"
						bsStyle="link"
						className={theme['subheader-back-button']}
						hideLabel
					/>
				</ActionBar.Content>
				<InputSubheaderBar {...rest} />
				{Array.isArray(componentsCenter) && (
					<SubHeaderBarActions
						components={componentsCenter}
						className={classNames([`${theme['subheader-center']}`], {
							[`${theme['no-margin-right']}`]: componentsRight,
						})}
						center
						right={false}
					/>
				)}
				{Array.isArray(componentsRight) && (
					<SubHeaderBarActions
						components={componentsRight}
						className={theme['subheader-right']}
						center={false}
						right
					/>
				)}
			</ActionBar>
		</div>
	);
}

SubHeaderBar.propTypes = {
	onGoBack: PropTypes.func.isRequired,
	editMode: PropTypes.bool,
	componentsLeft: PropTypes.array,
	componentsCenter: PropTypes.array,
	componentsRight: PropTypes.array,
	className: PropTypes.string,
};

export { SubHeaderBar as default, SubHeaderBarActions };
