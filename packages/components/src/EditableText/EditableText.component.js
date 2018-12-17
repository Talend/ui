import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { translate } from 'react-i18next';
import Skeleton from '../Skeleton';
import TooltipTrigger from '../TooltipTrigger';
import { Action } from '../Actions';
import InlineForm from './InlineForm.component';
import theme from './EditableText.scss';
import getDefaultT from '../translate';

import I18N_DOMAIN_COMPONENTS from '../constants';

export function PlainTextTitle({ onEdit, disabled, text, inProgress, feature, t }) {
	const isDisabled = disabled || inProgress;
	return (
		<div className={theme['tc-editable-text-title']}>
			<TooltipTrigger label={text} tooltipPlacement="bottom">
				<span
					className={classNames(theme['tc-editable-text-wording'], 'tc-editable-text-wording')}
					onDoubleClick={isDisabled ? undefined : onEdit}
				>
					{text}
				</span>
			</TooltipTrigger>
			<Action
				name="action-edit"
				label={t('MODIFY_TOOLTIP', { defaultValue: 'Edit' })}
				icon="talend-pencil"
				onClick={onEdit}
				bsStyle="link"
				className={classNames(theme['tc-editable-text-pencil'], 'tc-editable-text-pencil')}
				disabled={disabled || inProgress}
				hideLabel
				data-feature={feature}
			/>
		</div>
	);
}

PlainTextTitle.propTypes = {
	text: PropTypes.string.isRequired,
	onEdit: PropTypes.func.isRequired,
	disabled: PropTypes.bool,
	inProgress: PropTypes.bool,
	feature: PropTypes.string,
	t: PropTypes.func,
};

PlainTextTitle.defaultProps = {
	t: getDefaultT(),
};

export function EditableTextComponent({ editMode, loading, inProgress, ...rest }) {
	if (loading) {
		return <Skeleton type={Skeleton.TYPES.text} size={Skeleton.SIZES.large} />;
	}
	const Component = editMode ? InlineForm : PlainTextTitle;
	const allyProps = {};
	if (inProgress) {
		allyProps['aria-label'] = rest.t('EDITABLE_TEXT_IN_PROGRESS', {
			defaultValue: 'Edit in progress',
		});
		allyProps['aria-busy'] = true;
	}

	return (
		<div
			className={classNames(theme['tc-editable-text'], 'tc-editable-text', {
				[theme['tc-editable-text-blink']]: inProgress,
				'tc-editable-text-blink': inProgress,
			})}
			{...allyProps}
		>
			<Component inProgress={inProgress} {...rest} />
		</div>
	);
}

EditableTextComponent.displayName = 'EditableText';

EditableTextComponent.propTypes = {
	text: PropTypes.string.isRequired,
	editMode: PropTypes.bool,
	loading: PropTypes.bool,
	inProgress: PropTypes.bool,
	onEdit: PropTypes.func.isRequired,
	disabled: PropTypes.bool,
	t: PropTypes.func,
};

EditableTextComponent.defaultProps = {
	editMode: false,
	loading: false,
	inProgress: false,
	t: getDefaultT(),
};

export default translate(I18N_DOMAIN_COMPONENTS)(EditableTextComponent);
