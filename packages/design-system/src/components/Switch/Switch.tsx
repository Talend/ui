import React, { useLayoutEffect, useRef } from 'react';
import { Radio, RadioGroup, useRadioState } from 'reakit';
import classnames from 'classnames';
import theme from './Switch.module.scss';

export type SwitchProps = React.PropsWithChildren<any> & {
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
	const radio = useRadioState({
		state: value || defaultValue || (values && values[0]),
		loop: false,
		unstable_virtual: true,
	});

	const containerRef = useRef<React.PropsWithChildren<any>>();
	const switchIndicator = useRef<React.PropsWithChildren<any>>();

	useLayoutEffect(() => {
		const radioGroup = containerRef?.current;
		if (!radioGroup) {
			return;
		}
		const radioGroupChildren = Array.prototype.slice.call(radioGroup.children);
		const checkedElement = radioGroup.querySelector(`#${radio.currentId}`);
		if (!checkedElement) {
			return;
		}
		const checkedRadioIndex = radioGroupChildren.indexOf(checkedElement);
		const checkedRadioSpanWidth = checkedElement.scrollWidth;
		const switchIndicatorRef = switchIndicator?.current;
		if (switchIndicatorRef) {
			switchIndicatorRef.style.width = `${checkedRadioSpanWidth}px`;
			const radioWidths = radio.items.map(item => item.ref.current?.scrollWidth || 0);
			switchIndicatorRef.style.transform = `translateX(${radioWidths
				?.slice(0, checkedRadioIndex)
				.reduce((accumulator, currentValue) => accumulator + currentValue, 0)}px)`;
			switchIndicatorRef.dataset.animated = true;
		}
	}, [radio, defaultValue, radio.items]);

	return (
		<div
			className={classnames(theme.switch, {
				[theme.readOnly]: readOnly,
				[theme.disabled]: disabled,
			})}
		>
			<RadioGroup {...rest} {...radio} ref={containerRef} aria-label={label} disabled={disabled}>
				{values.map((v: string, i: number) => {
					const isChecked = radio.state === v;
					return (
						<Radio
							onChange={(event: React.MouseEvent<HTMLButtonElement>) =>
								onChange && onChange(event, v)
							}
							{...radio}
							value={v}
							as="button"
							key={i}
							data-checked={isChecked}
						>
							{v}
						</Radio>
					);
				})}
				<div
					className={theme.switchIndicator}
					ref={switchIndicator}
					data-animated={false}
					aria-hidden="true"
				>
					<em />
				</div>
			</RadioGroup>
		</div>
	);
};

export default Switch;
