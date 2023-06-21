import { useLayoutEffect, useRef, useState, useEffect } from 'react';
import type { PropsWithChildren, MouseEvent } from 'react';
import { randomUUID } from '@talend/utils';
import classnames from 'classnames';
import theme from './Switch.module.scss';

export type SwitchProps = PropsWithChildren<any> & {
	label: string;
	value?: string;
	defaultValue?: string;
	values?: any[];
	checked: boolean;
	disabled: boolean;
	readOnly: boolean;
};

const Switch = ({
	label,
	value,
	defaultValue,
	values,
	checked,
	disabled,
	readOnly,
	onChange,
	...rest
}: SwitchProps) => {
	const [radio, setRadio] = useState(value || defaultValue || (values && values[0]));
	const switchIndicator = useRef<PropsWithChildren<any>>();
	const containerRef = useRef<PropsWithChildren<any>>();
	const [valueIds, setValueIds] = useState<string[]>(values.map(() => `id-${randomUUID()}`));
	useEffect(() => {
		setValueIds(values.map(() => `id-${randomUUID()}`));
	}, [values]);
	// const radio = useRadioState({
	// 	state: value || defaultValue || (values && values[0]),
	// 	loop: false,
	// 	unstable_virtual: true,
	// });

	// const containerRef = useRef<PropsWithChildren<any>>();
	// const switchIndicator = useRef<PropsWithChildren<any>>();

	useLayoutEffect(() => {
		const radioGroup = containerRef?.current;
		if (!radioGroup) {
			return;
		}
		const checkedRadioIndex = values.indexOf(radio);
		const currentId = valueIds[checkedRadioIndex];

		const checkedElement = radioGroup.querySelector(`#${currentId}`);
		const items = Array.from(radioGroup.querySelectorAll(`.${theme.btn}`));
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
			switchIndicatorRef.dataset.animated = true;
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
				disabled={disabled}
			>
				{values.map((v: string, i: number) => {
					const isChecked = radio === v;
					return (
						<button
							id={valueIds[i]}
							className={theme.btn}
							onChange={(event: MouseEvent<HTMLButtonElement>) => onChange && onChange(event, v)}
							tabIndex={-1}
							role="radio"
							aria-checked={isChecked}
							onClick={() => setRadio(v)}
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

export default Switch;
