import * as React from 'react';
import styled from 'styled-components';
import { Button } from 'reakit';
import tokens from '../../tokens';

const ButtonAsAnchor = styled(Button)`
	color: ${tokens.colors.lochmara};
`;

function Link({ href = '#', ...rest }) {
	return <ButtonAsAnchor as="a" href={href} {...rest} />;
}

export default Link;
