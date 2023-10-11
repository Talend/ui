import { MouseEvent, useLayoutEffect, useRef, useState, useEffect } from 'react';
import type { PropsWithChildren, HTMLAttributes } from 'react';

import classnames from 'classnames';

import { randomUUID } from '@talend/utils';

import theme from './Switch.module.scss';

const emptyValues: string[] = [];

export type SwitchProps = PropsWithChildren<Omit<HTMLAttributes<HTMLDivElement>, 'onChange'>> & {
	label?: string;
	value?: string;
	defaultValue?: string;
	values?: string[];
	checked?: boolean;
	disabled?: boolean;
	readOnly?: boolean;
	// Redefine onChange prop
	onChange?: (event: MouseEvent<HTMLButtonElement>, selectedValue: string) => void;
};

export const Switch = ({
	label,
	value,
	defaultValue,
	values = emptyValues,
	checked,
	disabled,
	readOnly,
	onChange,
	...rest
}: SwitchProps) => {
	const [radio, setRadio] = useState(value || defaultValue || (values && values[0]));
	const switchIndicator = useRef<PropsWithChildren<HTMLSpanElement>>(null);
	const containerRef = useRef<PropsWithChildren<HTMLDivElement>>(null);
	const [valueIds, setValueIds] = useState<string[]>(values.map(() => `id-${randomUUID()}`));
	useEffect(() => {
		setValueIds(values.map(() => `id-${randomUUID()}`));
	}, [values]);

	useLayoutEffect(() => {
		const radioGroup = containerRef?.current;
		if (!radioGroup) {
			return;
		}
		const checkedRadioIndex = values.indexOf(radio);
		const currentId = valueIds[checkedRadioIndex];

		const checkedElement = radioGroup.querySelector(`#${currentId}`);
		const items = Array.from<HTMLOptionElement>(radioGroup.querySelectorAll(`.${theme.btn}`));
		if (!checkedElement) {
			return;
		}
		const checkedRadioSpanWidth = checkedElement.scrollWidth;
		const switchIndicatorRef = switchIndicator?.current;
		if (switchIndicatorRef) {
			switchIndicatorRef.style.width = `${checkedRadioSpanWidth}px`;
			const radioWidths = items.map(item => item?.scrollWidth || 0);
			switchIndicatorRef.style.transform = `translateX(${radioWidths
				?.slice(0, checkedRadioIndex)
				.reduce((accumulator, currentValue) => accumulator + currentValue, 0)}px)`;
			switchIndicatorRef.dataset.animated = 'true';
		}
	}, [radio, defaultValue, value, values, valueIds]);

	return (
		<div
			className={classnames(theme.switch, {
				[theme.readOnly]: readOnly,
				[theme.disabled]: disabled,
			})}
		>
			<div
				className={theme.container}
				role="radiogroup"
				tabIndex={0}
				ref={containerRef}
				aria-activedescendant={valueIds[values.indexOf(radio)]}
				{...rest}
				aria-label={label}
			>
				{values.map((v: string, i: number) => {
					const isChecked = radio === v;
					return (
						<button
							id={valueIds[i]}
							className={theme.btn}
							tabIndex={-1}
							role="radio"
							aria-checked={isChecked}
							onClick={(e: MouseEvent<HTMLButtonElement>) => {
								setRadio(v);
								onChange?.(e, v);
							}}
							value={v}
							key={i}
							data-checked={isChecked}
						>
							{v}
						</button>
					);
				})}
				<span
					className={theme.switchIndicator}
					ref={switchIndicator}
					data-animated={false}
					aria-hidden="true"
				>
					<em />
				</span>
			</div>
		</div>
	);
};

Switch.displayName = 'Switch';
