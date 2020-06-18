import React from 'react';
import styled from 'styled-components';
import Field from '../Field';

import CaretSVG from './../../../../icons/caret.svg';
import tokens from '../../../../tokens';

const Div = styled.div(
	({ theme }) => `
		.input--select {
			position: relative;
		}
		
		.input--select:not(.input--multiple) select {
			padding-right: 3.2rem;
			appearance: none;
		}
		
		.input--select:not(.input--multiple) select:hover {
  			box-shadow: 0 0 0 1px  ${theme.colors.inputBorderHoverColor};
		}
  
		.input--select:not(.input--multiple) select:disabled {
			cursor: not-allowed;
			opacity: ${tokens.opacity.disabled};
			box-shadow: 0 0 0 1px ${theme.colors.inputBorderDisabledColor};
		}

		.input--select:not(.input--multiple):after {
			display: flex;
			content: '';
			top: 0;
			bottom: 0;
			right: 0;
			position: absolute;
			width: ${tokens.sizes.smallerr};
			margin: 0 1rem;
			mask-repeat: no-repeat;
			mask-position: center;
			background-color: ${theme.colors.inputPlaceholderColor};
			mask-image: url(${CaretSVG});
			pointer-events: none;
		}
`,
);

function Select({ children, values, ...rest }) {
	function getContent() {
		if (Array.isArray(values)) {
			return values.map((value, index) => (
				<option key={index} value={value}>
					{value}
				</option>
			));
		}
		if (values) {
			return Object.entries(values).map(([key, keyValues], i) => (
				<optGroup key={i} label={key}>
					{keyValues.map((value, j) => (
						<option key={j} value={value}>
							{value}
						</option>
					))}
				</optGroup>
			));
		}
		return children;
	}

	return (
		<Div>
			<Field {...rest} as="select">
				<>{getContent()}</>
			</Field>
		</Div>
	);
}

export default Select;
