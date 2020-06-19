import React from 'react';
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
		background: ${tokens.colors.alto};
		box-shadow: inset 0 .1rem .3rem 0 rgba(0, 0, 0, .25);
	}
	
	${
		!readOnly
			? `
			input:not(:disabled) + span:hover:before,
			input:not(:disabled):focus + span:before {
				background: ${shade(0.25, tokens.colors.alto)};
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
    	display: flex;
		padding: 0 1rem;
		background: ${tokens.colors.alto};
		border-radius: 10rem;
		box-shadow: inset 0 .1rem .3rem 0 rgba(0, 0, 0, .25);
		overflow: hidden;
	}
	
	input {
	    position: absolute;
		margin-left: -200vw;
	}
	
	label {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: space-around;
		padding: 0 1rem;
		font-size: ${tokens.fontSizes.small};
		font-weight: ${tokens.fontWeights.normal};		
    	opacity: ${tokens.opacity.disabled};		
    	cursor: pointer;
		z-index: 2;
	}
	
	label span {
	}	
	
	label:nth-child(1) {
		padding-left: 0;
	}
	
	label:nth-child(${values.length}) {
		padding-right: 0;
	}

	strong {
    	position: absolute;
    	top: 0;
    	left: 0;
    	bottom: 0;
    	padding: 0;
    	width: ${100 / values.length}%;
		transform: translateX(-200%);
    	transition: transform .3s ease-out;
		z-index: 1;
  	}
  	
  	strong em {
  		position: absolute;
  		top: .2rem;
  		left: -.2rem;
  		bottom: .2rem;
  		right: -.2rem;
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
				pointer-events: none;
			`
	} 
  
	[data-checked="true"] {
		color: ${theme.colors.inputBackgroundColor};
		opacity: 1;
	}
	
	${values.map(
		(value, index) => `
			[data-checked="true"]:nth-child(${index + 1}) ~ strong {
				transform: translateX(${index * 100}%);
			}

			transform: none !important;
			
			${
				index === 0
					? ` 
				[data-checked="true"]:nth-child(${index + 1}) ~ strong em {
					left: .2rem;
				}
			`
					: ''
			}
			
			${
				index === values.length - 1
					? ` 
				[data-checked="true"]:nth-child(${index + 1}) ~ strong em {
					right: .2rem;
				}
			`
					: ''
			}
		`,
	)}`,
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

	const radio = useRadioState({ state: value });
	return (
		<DivFlex values={values} readOnly={readOnly}>
			<RadioGroup {...rest} {...radio} aria-label={label}>
				{values.map((v, i) => {
					const isChecked = radio.state === v;
					return (
						<label key={i} data-checked={isChecked}>
							<Radio {...radio} value={v} /> <span>{v}</span>
						</label>
					);
				})}
				<strong aria-hidden="true">
					<em></em>
				</strong>
			</RadioGroup>
		</DivFlex>
	);
}

export default Switch;
