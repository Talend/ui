import * as React from 'react';
import styled from 'styled-components';
import { tint } from 'polished';
import InlineMessage, { InlineMessageProps } from '../InlineMessage';
import Icon from '../../Icon';

const StyledComponent = styled(InlineMessage)`
	color: ${({ theme }) => theme.colors.warningColor};
	background: ${(props) => props.withBackground && tint(0.9, props.theme.colors.warningColor)};
`;

const InlineMessageWarning = React.forwardRef((props: InlineMessageProps, ref) => {
	return <StyledComponent icon={<Icon name={'warning'} />} {...props} ref={ref} />;
});

export default React.memo(InlineMessageWarning);
