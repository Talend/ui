import React, { forwardRef, Ref } from 'react';

import classnames from 'classnames';
import { DataAttributes } from 'src/types';

import { IconNameWithSize } from '@talend/icons';

import Clickable from '../../Clickable';
import Dropdown, { DropdownItemType } from '../../Dropdown/Dropdown';
import { SizedIcon } from '../../Icon';

import styles from './OperatorButton.module.scss';

export interface BadgeOperator {
	icon: IconNameWithSize<'S'>;
	label: string;
}

type OperatorButtonProps = {
	componentId?: string;
	selectedOperator?: BadgeOperator;
	operators: BadgeOperator[];
	onChange: (operator: BadgeOperator) => void;
} & Partial<DataAttributes>;

export const OperatorButton = forwardRef(
	(
		{
			componentId,
			'data-testid': dataTestId,
			'data-test': dataTest,
			selectedOperator,
			operators,
			onChange,
			...rest
		}: OperatorButtonProps,
		ref: Ref<HTMLButtonElement>,
	) => {
		const defaultTestId = 'badge-button';

		const items: DropdownItemType[] = operators.map(item => ({
			...item,
			type: 'button',
			onClick: () => onChange(item),
		}));

		return (
			<Dropdown items={items} aria-label="Custom menu">
				<Clickable
					className={classnames(styles.operator__button)}
					data-testid={dataTestId ? `${dataTestId}.${defaultTestId}` : defaultTestId}
					data-test={dataTest ? `${dataTest}.${defaultTestId}` : defaultTestId}
					key={componentId}
					onClick={() => {}}
					ref={ref}
					type="button"
					{...rest}
				>
					{selectedOperator && <SizedIcon size="S" name={selectedOperator.icon} />}
					{!selectedOperator && <SizedIcon size="S" name="between" />}
				</Clickable>
			</Dropdown>
		);
	},
);

OperatorButton.displayName = 'BadgeButton';
