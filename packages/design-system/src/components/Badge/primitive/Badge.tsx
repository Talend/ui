import React, { forwardRef, HTMLAttributes, Ref } from 'react';
import classNames from 'classnames';

import { ButtonTertiary } from '../../Button';
import { ButtonIcon } from '../../ButtonIcon';
import Divider from '../../Divider';
import Dropdown from '../../Dropdown';
import { StackHorizontal } from '../../Stack';

import style from './Badge.module.scss';

type BaseBadgeProps = Omit<
	HTMLAttributes<HTMLDivElement>,
	'className' | 'defaultValue' | 'onChange' | 'style'
> & {
	label: string;
};

type RemovableBadgeProps = BaseBadgeProps & {
	onRemove: (event: React.MouseEvent<HTMLButtonElement> | KeyboardEvent) => void;
};

type BadgeWithDropdownProps = BaseBadgeProps & {
	values: string[];
	defaultValue?: string;
	onChange: (
		event: React.MouseEvent<HTMLButtonElement> | KeyboardEvent,
		value: { label: string },
	) => void;
};

export type BadgeProps = RemovableBadgeProps | BadgeWithDropdownProps;

const Label = ({ children, ...rest }: HTMLAttributes<HTMLSpanElement>) => (
	<div className={style.badge__label}>
		<span {...rest} data-test="badge.label">
			{children}
		</span>
	</div>
);

const RemoveButton = ({
	onClick,
}: {
	onClick: (event: React.MouseEvent<HTMLButtonElement> | KeyboardEvent) => void;
}) => (
	<div className={style.badge__remove}>
		<ButtonIcon onClick={onClick} data-test="badge.remove" icon="talend-cross" size="XS">
			Remove
		</ButtonIcon>
	</div>
);

const Value = ({
	onChange,
	values,
	defaultValue,
	...rest
}: Omit<BadgeWithDropdownProps, 'label'>) => (
	<div className={style.badge__value}>
		<StackHorizontal gap="XXS" align="center">
			<Divider orientation="vertical" />
			<Dropdown
				{...rest}
				as={ButtonTertiary}
				size="S"
				onChange={onChange}
				data-test="badge.dropdown"
				items={values?.map((value: string) => ({
					label: value,
					onClick: (e: React.MouseEvent<HTMLButtonElement> | KeyboardEvent) =>
						onChange(e, { label: value }),
				}))}
			>
				{defaultValue}
			</Dropdown>
		</StackHorizontal>
	</div>
);

const Badge = forwardRef((props: BadgeProps, ref: Ref<HTMLDivElement>) => {
	if ('onRemove' in props) {
		const { label, onRemove } = props as RemovableBadgeProps;
		return (
			<div className={classNames(style.badge)} ref={ref}>
				<StackHorizontal gap="XS" align="center">
					<Label>{label}</Label>
					<RemoveButton onClick={onRemove} />
				</StackHorizontal>
			</div>
		);
	}
	if ('onChange' in props) {
		const { label, onChange, defaultValue, values, ...rest } = props as BadgeWithDropdownProps;
		return (
			<div className={classNames(style.badge, style.badgeFixed)} ref={ref}>
				<StackHorizontal gap="XS" align="center">
					<Label>{label}</Label>
					<Value {...rest} values={values} defaultValue={defaultValue} onChange={onChange} />
				</StackHorizontal>
			</div>
		);
	}
	return null;
});

export default Badge;
