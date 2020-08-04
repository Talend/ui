import React, { useEffect, useRef } from 'react';
import { Radio, RadioGroup, useRadioState } from 'reakit/Radio';

import * as S from './Switch.style';

function Switch({ label, value, values, checked, disabled, readOnly, ...rest }) {
	const radio = useRadioState({
		state: value || values[0],
		loop: false,
		unstable_virtual: true,
	});

	const containerRef = useRef();
	const switchIndicator = useRef();

	let radioWidths = [];

	useEffect(() => {
		radioWidths = radio.items.map(item => {
			const radio = item.ref.current;
			return radio.scrollWidth;
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
		const switchIndicatorRef = switchIndicator.current;
		const isFirst = checkedRadioIndex === 0;
		const isLast = checkedRadioIndex === radioWidths.length - 1;
		if (switchIndicatorRef) {
			switchIndicatorRef.style.transform = `translateX(${
				radioWidths
					.slice(0, checkedRadioIndex)
					.reduce((accumulator, currentValue) => accumulator + currentValue, 0) +
				(!isFirst ? 10 : 0)
			}px)`;
			switchIndicatorRef.style.width = `${checkedRadioSpanWidth + (isFirst || isLast ? 10 : 0)}px`;
		}
	}, [radio]);

	return (
		<S.Switch values={values} readOnly={readOnly} disabled={disabled}>
			<RadioGroup {...rest} {...radio} ref={containerRef} aria-label={label} disabled={disabled}>
				{values.map((v, i) => {
					const isChecked = radio.state === v;
					return (
						<Radio {...radio} value={v} as="button" key={i} data-checked={isChecked}>
							{v}
						</Radio>
					);
				})}
				<strong ref={switchIndicator} aria-hidden="true">
					<em></em>
				</strong>
			</RadioGroup>
		</S.Switch>
	);
}

export default Switch;
