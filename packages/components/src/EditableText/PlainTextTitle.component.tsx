/* eslint-disable @typescript-eslint/no-explicit-any */
import classNames from 'classnames';
import { TFunction } from 'i18next';
import TooltipTrigger from '../TooltipTrigger';
import { Action } from '../Actions';
import getDefaultT from '../translate';
import theme from './PlainTextTitle.module.css';

type PlainTextTitleProps = {
	id?: string;
	componentClass: any;
	disabled?: boolean;
	feature?: string;
	inProgress?: boolean;
	onEdit: () => void;
	text: string;
	t: TFunction;
	[key: string]: any;
};

type DataProps = {
	[key: string]: string;
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
	...rest
}: PlainTextTitleProps) {
	const isDisabled = disabled || inProgress;
	const ComponentClass = componentClass;
	const dataProps: DataProps = Object.keys(rest).reduce<DataProps>((acc, propName) => {
		if (propName.startsWith('data-')) {
			acc[propName] = rest[propName];
		}
		return acc;
	}, {});
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
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-ignore
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
				{...dataProps}
			/>
		</div>
	);
}
