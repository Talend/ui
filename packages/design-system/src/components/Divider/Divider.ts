import styled from 'styled-components';
import { Separator as Divider } from 'reakit';

import tokens from '../../tokens';

const StyledDivider = styled(Divider)`
	margin: ${tokens.space.m} 0;
	border: 1px solid ${tokens.colors.gray[50]};
	opacity: ${tokens.opacity.disabled};
`;

export default StyledDivider;
