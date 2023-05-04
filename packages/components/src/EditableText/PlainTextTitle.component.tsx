import classNames from 'classnames';
import TooltipTrigger from '../TooltipTrigger';
import { Action } from '../Actions';
import getDefaultT from '../translate';
import theme from './PlainTextTitle.module.scss';

type PlainTextTitleProps = {
	id?: string;
	componentClass: string;
	disabled?: bool;
	feature?: string;
	inProgress?: bool;
	onEdit: func;
	text: string;
	t: func;
};

export function PlainTextTitle({
	id,
	componentClass = 'span',
	onEdit,
	disabled,
	text,
	inProgress,
	feature,
	t = getDefaultT(),
}: PlainTextTitleProps) {
	const isDisabled = disabled || inProgress;
	const ComponentClass = componentClass;
	return (
		<div className={theme['tc-editable-text-title']}>
			<TooltipTrigger
				label={text}
				tooltipPlacement="bottom"
				className="tc-editable-text-wording-wrapper"
			>
				<ComponentClass
					id={id}
					className={classNames(theme['tc-editable-text-wording'], 'tc-editable-text-wording')}
					onDoubleClick={isDisabled ? undefined : onEdit}
				>
					{text}
				</ComponentClass>
			</TooltipTrigger>
			<Action
				name="action-edit"
				label={t('MODIFY_TOOLTIP', { defaultValue: 'Rename' })}
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
