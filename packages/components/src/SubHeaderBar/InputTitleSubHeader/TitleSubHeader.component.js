import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Action } from '../../Actions';
import theme from './InputTitleSubHeader.scss';
import { getDefaultTranslate } from '../../translate';

function noop() {}

function TitleSubHeader({ title, subTitle, onEdit, editable, t }) {
	const wordingClassNames = onEdit
	? classNames(theme['tc-subheader-details-text-title-wording'], 'tc-subheader-details-text-title-wording')
	: classNames(theme['tc-subheader-details-text-title-wording-with-hover'], 'tc-subheader-details-text-title-wording-with-hover');
	return (
		<div className={classNames(theme['tc-subheader-details-text'], 'tc-subheader-details-text')}>
			<div
				className={classNames(
					theme['tc-subheader-details-text-title'],
					'tc-subheader-details-text-title',
				)}
			>
				<h1
					onDoubleClick={editable ? onEdit : noop}
					className={wordingClassNames}
				>
					{title}
				</h1>
				{editable && (
					<Action
						name="action-edit-title"
						label={t('MODIFY_TOOLTIP', { defaultValue: 'Modify' })}
						icon="talend-pencil"
						onClick={onEdit}
						bsStyle="link"
						className={classNames(
							theme['tc-subheader-details-text-title-pencil'],
							'tc-subheader-details-text-title-pencil',
						)}
						hideLabel
					/>
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
	);
}

TitleSubHeader.propTypes = {
	title: PropTypes.string.isRequired,
	editable: PropTypes.bool.isRequired,
	onEdit: PropTypes.func,
	subTitle: PropTypes.string,
	t: PropTypes.func,
};

TitleSubHeader.defaultProps = {
	t: getDefaultTranslate,
	editable: false,
};

export default TitleSubHeader;
