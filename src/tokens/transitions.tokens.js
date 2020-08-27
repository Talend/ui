import { keyframes } from 'styled-components';

/**
 *
 *	animation: ${tokens.transtions.show} 0.2s normal forwards ease-in-out;
 */
export default {
	show: keyframes`
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    `,
};
