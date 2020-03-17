import React from 'react';
import styled from 'styled-components';
import { tint } from 'polished';
import Alert from '../Alert';
import Icon from '../../Icon';

const StyledComponent = styled(Alert)`
	color: ${props =>
		!props.withBackground && props.theme.colors.inverseColor
			? props.theme.colors.inverseColor
			: props.theme.colors.mainColor};
	background: ${props => props.withBackground && tint(0.9, props.theme.colors.destructiveColor)};
`;

const AlertDestructive = React.forwardRef((props, ref) => {
	return (
		<StyledComponent
			icon={<Icon className={'text-red-500'} name={'cross'} />}
			{...props}
			ref={ref}
		/>
	);
});

AlertDestructive.propTypes = Alert.propTypes;

export default React.memo(AlertDestructive);
