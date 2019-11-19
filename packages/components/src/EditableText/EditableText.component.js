import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withTranslation } from 'react-i18next';
import Skeleton from '../Skeleton';
import TooltipTrigger from '../TooltipTrigger';
import { Action } from '../Actions';
import InlineForm from './InlineForm.component';
import theme from './EditableText.scss';
import getDefaultT from '../translate';

import I18N_DOMAIN_COMPONENTS from '../constants';

export function PlainTextTitle({ componentClass, onEdit, disabled, text, inProgress, feature, t }) {
	const isDisabled = disabled || inProgress;
	const ComponentClass = componentClass;
	return (
		<div className={theme['tc-editable-text-title']}>
			<TooltipTrigger
				label={text}
				tooltipPlacement="bottom"
				className={'tc-editable-text-wording-wrapper'}
			>
				<ComponentClass
					className={classNames(theme['tc-editable-text-wording'], 'tc-editable-text-wording')}
					onDoubleClick={isDisabled ? undefined : onEdit}
				>
					{text}
				</ComponentClass>
			</TooltipTrigger>
			<Action
				name="action-edit"
				label={t('MODIFY_TOOLTIP', { defaultValue: 'Edit' })}
				icon="talend-pencil"
				onClick={onEdit}
				bsStyle="link"
				className={classNames(theme['tc-editable-text-pencil'], 'tc-editable-text-pencil', {
					[theme['tc-editable-text-empty-pencil']]: !text,
				})}
				disabled={disabled || inProgress}
				hideLabel
				data-feature={feature}
			/>
		</div>
	);
}
PlainTextTitle.propTypes = {
	componentClass: PropTypes.string,
	disabled: PropTypes.bool,
	feature: PropTypes.string,
	inProgress: PropTypes.bool,
	onEdit: PropTypes.func.isRequired,
	text: PropTypes.string.isRequired,
	t: PropTypes.func,
};

PlainTextTitle.defaultProps = {
	componentClass: 'span',
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
	componentClass: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
	disabled: PropTypes.bool,
	editMode: PropTypes.bool,
	inProgress: PropTypes.bool,
	loading: PropTypes.bool,
	onEdit: PropTypes.func.isRequired,
	text: PropTypes.string.isRequired,
	t: PropTypes.func,
};

EditableTextComponent.defaultProps = {
	editMode: false,
	inProgress: false,
	loading: false,
	t: getDefaultT(),
};

export default withTranslation(I18N_DOMAIN_COMPONENTS)(EditableTextComponent);
