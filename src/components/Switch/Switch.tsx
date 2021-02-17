import React, { useEffect, useRef } from 'react';
import { Radio, RadioGroup, useRadioState } from 'reakit';

import * as S from './Switch.style';

export type SwitchProps = React.PropsWithChildren<any> & {
	label: string;
	value?: string;
	values?: any[];
	checked: boolean;
	disabled: boolean;
	readOnly: boolean;
};

const Switch = ({
	label,
	value,
	values,
	checked,
	disabled,
	readOnly,
	onChange,
	...rest
}: SwitchProps) => {
	const radio = useRadioState({
		state: value || (values && values[0]),
		loop: false,
		unstable_virtual: true,
	});

	const containerRef = useRef<React.PropsWithChildren<any>>();
	const switchIndicator = useRef<React.PropsWithChildren<any>>();

	let radioWidths: number[] = [];

	useEffect(() => {
		radioWidths = radio.items.map(item => {
			if (item.ref.current) return item.ref.current.scrollWidth;
			return 0;
		});
	});

	useEffect(() => {
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
			switchIndicatorRef.style.transform = `translateX(${radioWidths
				.slice(0, checkedRadioIndex)
				.reduce((accumulator, currentValue) => accumulator + currentValue, 0)}px)`;
			switchIndicatorRef.style.width = `${checkedRadioSpanWidth}px`;
		}
	}, [radio]);

	return (
		<S.Switch readOnly={readOnly} disabled={disabled}>
			<RadioGroup {...rest} {...radio} ref={containerRef} aria-label={label} disabled={disabled}>
				{values.map((v: string, i: number) => {
					const isChecked = radio.state === v;
					return (
						<Radio
							onChange={event => onChange && onChange(event, v)}
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
				<S.SwitchIndicator ref={switchIndicator} aria-hidden="true">
					<em />
				</S.SwitchIndicator>
			</RadioGroup>
		</S.Switch>
	);
};

export default Switch;
