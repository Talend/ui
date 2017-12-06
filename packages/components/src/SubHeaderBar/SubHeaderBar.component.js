import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Action } from '../Actions';
import ActionBar from '../ActionBar';
import InputTitleSubHeader from './InputTitleSubHeader';
import theme from './SubHeaderBar.scss';

function SubHeaderBarActions({ components, left, right, center, className }) {
	return (
		<div className={className}>
			{components.map((component, index) => (
				<ActionBar.Content
					key={index}
					tag={component.tag}
					left={left}
					center={center}
					right={right}
				>
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
	left: PropTypes.bool,
	className: PropTypes.string,
};

function SubHeaderBar({ onGoBack, componentsCenter, componentsRight, className, ...rest }) {
	const defaultComponentsLeft = [
		{
			injectedComponent: (
				<Action
					id="backArrow"
					onClick={onGoBack}
					label="backArrow"
					icon="talend-arrow-left"
					bsStyle="link"
					className={classNames(theme['subheader-back-button'], 'btn-link')}
					hideLabel
				/>
			),
		},
		{
			injectedComponent: <InputTitleSubHeader {...rest} />,
		},
	];
	return (
		<div className={classNames(theme['tc-subheader-container'], className)}>
			<ActionBar className={classNames(theme['subheader-navbar'], 'subheader-navbar')}>
				<SubHeaderBarActions
					components={defaultComponentsLeft}
					className={theme['subheader-left']}
					left
					center={false}
					right={false}
				/>
				{Array.isArray(componentsCenter) && (
					<SubHeaderBarActions
						components={componentsCenter}
						className={classNames([`${theme['subheader-center']}`], {
							[`${theme['no-margin-right']}`]: componentsRight,
						})}
						left={false}
						center
						right={false}
					/>
				)}
				{Array.isArray(componentsRight) && (
					<SubHeaderBarActions
						components={componentsRight}
						className={theme['subheader-right']}
						left={false}
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
	componentsCenter: PropTypes.array,
	componentsRight: PropTypes.array,
	className: PropTypes.string,
};

export { SubHeaderBar as default, SubHeaderBarActions };
