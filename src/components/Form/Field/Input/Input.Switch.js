import React from 'react';
import styled from 'styled-components';
import { useRadioState, Radio, RadioGroup } from 'reakit/Radio';
import { useCheckboxState, Checkbox } from 'reakit/Checkbox';
import InlineStyle from './styles/Input.Inline.style';
import tokens from '../../../../tokens';

const Div = styled(InlineStyle)(
	({ theme }) => `
	input + span {
		padding-left: calc(2rem + 3.2rem);
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
		background: ${tokens.colors.gallery};
		box-shadow: inset 0 .1rem .3rem 0 rgba(0, 0, 0, .25), 
					0 0 0 1px ${theme.colors.inputBorderColor};
	}
	
	input:not(:disabled) + span:hover:before,
	input:not(:disabled):focus + span:before {
		box-shadow: inset 0 .1rem .3rem 0 rgba(0, 0, 0, .25), 
					0 0 0 1px ${theme.colors.inputBorderFocusColor};
	}
	
	input:checked + span:before {
		box-shadow: inset 0 .1rem .3rem 0 rgba(0, 0, 0, .25), 
					0 0 0 1px ${theme.colors.activeColor};
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
	({ theme, values }) =>
		`
	div {
		position: relative;
    	display: flex;
		padding: 0 1rem;
		background: ${tokens.colors.gallery};
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
		justify-content: center;
    	flex-grow: 1;
    	width: 1%;
		max-width: 10rem;
		font-weight: 600;		
		text-align: center;
		cursor: pointer;
    	opacity: ${tokens.opacity.disabled};
		z-index: 2;
	}
	
	label span {
		padding: 0 1rem;
	}	
	
	label:nth-child(1) span {
		padding-left: 0;
	}
	label:nth-child(${values.length}) span {
		padding-right: 0;
	}

	strong {
    	position: absolute;
    	top: 0;
    	left: 0;
    	bottom: 0;
    	padding: 0;
    	width: ${100 / values.length}%;
    	border-radius: 100px;
		transform: translateX(-100%);
    	transition: transform .3s;
		z-index: 1;
  	}
  	
  	strong em {
  		position: absolute;
  		top: .2rem;
  		left: .2rem;
  		bottom: .2rem;
  		right: .2rem;
	    background: ${theme.colors.activeColor};    
    	border-radius: 100px;
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
		`,
	)}`,
);

function Switch({ label, value, values, checked, ...rest }) {
	if (!values) {
		const checkbox = useCheckboxState({ state: checked });
		return (
			<Div>
				<label>
					<Checkbox {...rest} {...checkbox} /> <span>{label}</span>
				</label>
			</Div>
		);
	}

	const radio = useRadioState({ state: value });
	return (
		<DivFlex values={values}>
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
