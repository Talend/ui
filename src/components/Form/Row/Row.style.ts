import styled from 'styled-components';

import tokens from '../../../tokens';

export const Row = styled.div`
	display: inline-flex;
	align-items: flex-start;
	gap: ${tokens.space.l};

	.input-group__item.input-group__item--prefix,
	.input-group__item.input-group__item--suffix {
		max-width: none;
	}
`;
