import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Skeleton from '../../Skeleton';
import { EditableText } from '../..';
import theme from './TitleSubHeader.scss';
import Icon from '../../Icon';
import getDefaultT from '../../translate';

function TitleSubHeader({
	title,
	iconId,
	loading,
	inProgress,
	editMode,
	editable,
	subTitle,
	...rest
}) {
	if (loading) {
		return <Skeleton type={Skeleton.TYPES.text} size={Skeleton.SIZES.large} />;
	}
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
					{editable || editMode ? (
						<EditableText text={title} editMode={editMode} {...rest} />
					) : (
						<h1
							className={classNames(
								theme['tc-subheader-details-text-title-wording'],
								'tc-subheader-details-text-title-wording',
							)}
						>
							{title}
						</h1>
					)}
				</div>
				{subTitle &&
					!editMode && (
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
	editMode: PropTypes.bool,
	iconId: PropTypes.string,
	loading: PropTypes.bool,
	inProgress: PropTypes.bool,
	editable: PropTypes.bool,
	subTitle: PropTypes.string,
};

TitleSubHeader.defaultProps = {
	editMode: false,
	loading: false,
	inProgress: false,
	t: getDefaultT(),
	editable: false,
};

export { TitleSubHeader as default };
