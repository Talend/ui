import React from 'react';
import styled from 'styled-components';
import { tint } from 'polished';
import InlineMessage from '../InlineMessage';
import Icon from '../../Icon';

const StyledComponent = styled(InlineMessage)`
	color: ${(props) => props.theme.colors.informationColor};
	background: ${(props) => props.withBackground && tint(0.9, props.theme.colors.informationColor)};
`;

const InlineMessageInformation = React.forwardRef((props, ref) => {
	return <StyledComponent icon={<Icon name={'information'} />} {...props} ref={ref} />;
});

InlineMessageInformation.propTypes = InlineMessage.propTypes;

export default React.memo(InlineMessageInformation);
