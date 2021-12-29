import styled from 'styled-components';

import tokens from '../../../tokens';

export const Row = styled.div`
	display: inline-flex;
	align-items: flex-start;
	gap: ${tokens.space.l};

	.c-field-group__item.c-field-group__item--prefix,
	.c-field-group__item.c-field-group__item--suffix {
		max-width: none;
	}
`;
