import styled from 'styled-components';
import tokens from '../../tokens';

export const Form = styled.form`
	margin: 0 auto;
	width: 100%;
	font-family: ${tokens.fonts.sansSerif};

	fieldset {
		padding: 0;
		border: none;
	}

	@media only screen and (min-width: ${tokens.breakpoints.m}) {
		max-width: 55%;
	}

	@media only screen and (min-width: ${tokens.breakpoints.xl}) {
		max-width: 78rem;
	}
`;

export const Row = styled.div`
	display: inline-flex;
	align-items: flex-start;
	gap: ${tokens.space.l};

	.input-group__item.input-group__item--prefix,
	.input-group__item.input-group__item--suffix {
		max-width: none;
	}
`;
