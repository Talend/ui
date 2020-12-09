import { keyframes } from 'styled-components';

export const showKeyframes = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`;

export default {
	show: '.3s ease-in-out',
};
