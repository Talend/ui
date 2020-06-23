import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { shade } from 'polished';
import { useRadioState, Radio, RadioGroup } from 'reakit/Radio';
import { useCheckboxState, Checkbox } from 'reakit/Checkbox';
import InlineStyle from './styles/Input.Inline.style';
import tokens from '../../../../tokens';

const Div = styled(InlineStyle)(
	({ theme, readOnly }) => `
	input + span {
		padding-left: calc(1rem + 3.2rem);
	}
	
	input + span:before,
	input + span:after {
		top: 0;
		border-radius: 10rem;
	}
	
	input + span:before {
		width: 3.2rem;
		height: 1.6rem;
	}
	
	input + span:after {
		height: 1.2rem;
		width: 1.2rem;
		transition: transform .3s;
	}

	input + span:before {
		background: ${theme.colors.inputRadioBackgroundColor};
		box-shadow: inset 0 .1rem .3rem 0 rgba(0, 0, 0, .25);
	}
	
	${
		!readOnly
			? `
			input:not(:disabled) + span:hover:before,
			input:not(:disabled):focus + span:before {
				background: ${shade(0.25, theme.colors.inputRadioBackgroundColor)};
				box-shadow: inset 0 .1rem .3rem 0 rgba(0, 0, 0, .25);
			}
			
			input:not(:disabled):checked + span:hover:before,
			input:not(:disabled):checked:focus + span:before {
				background: ${shade(0.25, theme.colors.activeColor)};
			}
			
			input:not(:disabled):focus + span:before {
				outline: .1rem solid ${theme.colors.focusColor};
			}
		`
			: `
			// FIXME
			pointer-events: none;	
		`
	}
	
	input:checked + span:before {
		box-shadow: inset 0 .1rem .3rem 0 rgba(0, 0, 0, .25);
	}
	
	input:checked + span:before {
		background: ${theme.colors.activeColor};	
	}
	
	input:checked + span:after {
		transform: translateX(1.5rem); 
	}
`,
);

const DivFlex = styled.div(
	({ theme, values, readOnly }) => `
	div {
		position: relative;
    	display: inline-flex;
		padding: 0 1rem;
		background: ${theme.colors.inputRadioBackgroundColor};
		border-radius: 10rem;
		box-shadow: inset 0 .1rem .3rem 0 rgba(0, 0, 0, .25);
		overflow: hidden;
	}
	
	button {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: space-around;
		padding: 0 1rem;
		color: ${theme.colors.textColor}
		font-size: ${tokens.fontSizes.small};
		font-weight: ${tokens.fontWeights.normal};		
    	opacity: ${tokens.opacity.disabled};
		user-select: none; 		
    	cursor: pointer;
		z-index: 2;
	}
	
	button:nth-child(1) {
		padding-left: 0;
	}
	
	button:nth-child(${values.length}) {
		padding-right: 0;
	}
	
	strong {
    	position: absolute;
    	top: 0;
    	left: 0;
    	width: 0;
    	bottom: 0;
    	transition: transform .2s, width .2s;
		z-index: 1;
  	}
  	
  	strong em {
  		position: absolute;
  		top: .2rem;
		right: .2rem;
  		bottom: .2rem;
  		left: .2rem;
	    background: ${theme.colors.activeColor};    
    	border-radius: 100px;
  	}

	${
		!readOnly
			? `
				div:hover strong em {
					background: ${shade(0.25, theme.colors.activeColor)};
				}
			`
			: `
				// FIXME
				// pointer-events: none;
			`
	} 
  
	[data-checked] {
		transition: color .3s;
	}
	
	[data-checked="true"] {
		color: ${theme.colors.inputBackgroundColor};
		opacity: 1;
	}
		
	[data-checked] ~ strong {
		visibility: hidden;
	}
	
	[data-checked="true"] ~ strong {
		visibility: visible;
	}
`,
);

function Switch({ label, value, values, checked, readOnly, ...rest }) {
	if (!values) {
		const checkbox = useCheckboxState({ state: checked });
		return (
			<Div readOnly={readOnly}>
				<label>
					<Checkbox {...rest} {...checkbox} /> <span>{label}</span>
				</label>
			</Div>
		);
	}

	const radio = useRadioState({
		state: value || values[0],
		loop: false,
		unstable_virtual: true,
	});

	const containerRef = useRef();
	const switchIndicator = useRef();

	let radioWidths = [];

	useEffect(() => {
		radioWidths = radio.items.map((item) => {
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
		<DivFlex values={values} readOnly={readOnly}>
			<RadioGroup {...rest} {...radio} ref={containerRef} aria-label={label}>
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
		</DivFlex>
	);
}

export default Switch;
