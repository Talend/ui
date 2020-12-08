import { keyframes } from 'styled-components';

export const showKeyframes = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`;

/**
 *
 *	animation: ${tokens.transtions.show} 0.2s normal forwards ease-in-out;
 */
export default {
	show: '.3s ease-in-out',
};
