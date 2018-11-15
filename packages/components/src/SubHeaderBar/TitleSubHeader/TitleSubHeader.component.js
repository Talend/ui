import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Skeleton from '../../Skeleton';
import { EditableText } from '../..';
import theme from './TitleSubHeader.scss';
import Icon from '../../Icon';
import Inject from '../../Inject';
import getDefaultT from '../../translate';
import TooltipTrigger from '../../TooltipTrigger';

function TitleSubHeader({
	title,
	iconId,
	loading,
	inProgress,
	editable,
	subTitle,
	getComponent,
	...rest
}) {
	if (loading) {
		return <Skeleton type={Skeleton.TYPES.text} size={Skeleton.SIZES.large} />;
	}

	const InjectedEditableText = Inject.get(getComponent, 'EditableText', EditableText);
	return (
		<div
			className={classNames(theme['tc-subheader-details'], 'tc-subheader-details', {
				[theme['tc-subheader-details-blink']]: inProgress,
				'tc-subheader-details-blink': inProgress,
			})}
		>
			{iconId && (
				<Icon
					name={iconId}
					className={classNames(theme['tc-subheader-details-icon'], 'tc-subheader-details-icon')}
				/>
			)}
			<div className={classNames(theme['tc-subheader-details-text'], 'tc-subheader-details-text')}>
				<div
					className={classNames(
						theme['tc-subheader-details-text-title'],
						'tc-subheader-details-text-title',
					)}
				>
					{editable ? (
						<InjectedEditableText text={title} inProgress={inProgress} {...rest} />
					) : (
						<TooltipTrigger label={title} tooltipPlacement="bottom">
							<h1
								className={classNames(
									theme['tc-subheader-details-text-title-wording'],
									'tc-subheader-details-text-title-wording',
								)}
							>
								{title}
							</h1>
						</TooltipTrigger>
					)}
				</div>
				{subTitle && (
					<small
						className={classNames(
							theme['tc-subheader-details-text-subtitle'],
							'tc-subheader-details-text-subtitle',
						)}
					>
						{subTitle}
					</small>
				)}
			</div>
		</div>
	);
}

TitleSubHeader.propTypes = {
	title: PropTypes.string.isRequired,
	iconId: PropTypes.string,
	loading: PropTypes.bool,
	inProgress: PropTypes.bool,
	editable: PropTypes.bool,
	subTitle: PropTypes.string,
	...Inject.PropTypes,
};

TitleSubHeader.defaultProps = {
	loading: false,
	inProgress: false,
	t: getDefaultT(),
	editable: false,
};

export { TitleSubHeader as default };
