import React from 'react';
import styled from 'styled-components';
import { shade } from 'polished';
import Input from './Input';
import tokens from '../../../../tokens';

const SRange = styled.div(
	({ theme }) => `
	input[type='range'] {
		-webkit-appearance: none;
		margin: 0;
		padding: 0;
		border: none;
		background: ${tokens.colors.transparent};
		width: 100%;

		&::-webkit-slider-runnable-track {
			width: 100%;
			height: ${tokens.sizes.xs};
			background: ${theme.colors.inputRadioBackgroundColor};
			border-radius: 1rem;
			transition: all 0.3s;
			cursor: pointer;
		}
        
        &:hover::-webkit-slider-runnable-track {
			background: ${shade(0.25, theme.colors.inputRadioBackgroundColor)};
        }
        
        &:focus::-webkit-slider-runnable-track {
            background: ${theme.colors.activeColor};
        }

		&::-webkit-slider-thumb {
			-webkit-appearance: none;
			margin-top: -${tokens.space.xs};
			height: ${tokens.sizes.l};
			width: ${tokens.sizes.l};
			border-radius: ${tokens.radii.circleRadius};
			background: ${theme.colors.inputBackgroundColor};
			box-shadow: 0 0 0 1px ${theme.colors.inputBorderColor};
			cursor: pointer;
		}
		
        &:focus::-webkit-slider-thumb {
        }
        
		/*
		&::-moz-range-track {
			width: 100%;
			height: 8.4px;
			cursor: pointer;
			box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
			background: #3071a9;
			border-radius: 1.3px;
			border: 0.2px solid #010101;
		}
		
		&::-moz-range-thumb {
			box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
			border: 1px solid #000000;
			height: 36px;
			width: 16px;
			border-radius: 3px;
			background: #ffffff;
			cursor: pointer;
		}
		
		&::-ms-track {
			width: 100%;
			height: 8.4px;
			cursor: pointer;
			background: transparent;
			border-color: transparent;
			border-width: 16px 0;
			color: transparent;
		}
		
		&::-ms-fill-lower {
			background: #2a6495;
			border: 0.2px solid #010101;
			border-radius: 2.6px;
			box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
		}
		
		&::-ms-fill-upper {
			background: #3071a9;
			border: 0.2px solid #010101;
			border-radius: 2.6px;
			box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
		}
		
		&::-ms-thumb {
			box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
			border: 1px solid #000000;
			height: 36px;
			width: 16px;
			border-radius: 3px;
			background: #ffffff;
			cursor: pointer;
		}
		
		&:focus::-ms-fill-lower,
		&:focus::-ms-fill-upper {
			background: #367ebd;
		}
		*/
	}
`,
);

function Range(props) {
	return (
		<SRange>
			<Input type="range" {...props} />
		</SRange>
	);
}

export default Range;
