import React from 'react';
import styled from 'styled-components';
import { tint } from 'polished';
import Alert from '../Alert';
import tokens from '../../../tokens';
import Icon from '../../Icon';

const StyledComponent = styled(Alert)`
	background: ${props => props.withBackground && tint(0.9, tokens.colors.successColor)};
`;

const AlertSuccess = React.forwardRef((props, ref) => {
	return (
		<StyledComponent
			icon={<Icon className={'text-green-500'} name={'checkCircle'} />}
			{...props}
			ref={ref}
		/>
	);
});

AlertSuccess.propTypes = Alert.propTypes;

export default React.memo(AlertSuccess);
