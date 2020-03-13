import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export const StyledComponent = styled.div`
	svg {
		height: 1rem;
		max-width: 100%;
		fill: currentColor;
	}
`;

// @link https://inclusive-components.design/notifications
function Alert({ icon, title, description, link, ...rest }) {
	return (
		<StyledComponent
			{...rest}
			className={`${rest.className} flex items-center p-2 rounded-md`}
			role="status"
			aria-live="polite"
		>
			<p className={'inline-flex'}>
				{(icon || title) && (
					<strong className={`inline-flex items-center`}>
						{icon && <span className={'px-1'}>{icon}</span>}
						{title && <span className={'pl-1 font-semibold'}>{title}</span>}
					</strong>
				)}
				{description && <span className={'pl-1'}>{description}</span>}
				{link && <span className={'pl-1'}>{link}</span>}
			</p>
		</StyledComponent>
	);
}

Alert.propTypes = {
	icon: PropTypes.node,
	title: PropTypes.string,
	description: PropTypes.string.isRequired,
	link: PropTypes.node,
};

export default Alert;
