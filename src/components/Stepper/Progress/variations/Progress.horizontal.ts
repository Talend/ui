import styled from 'styled-components';

import Progress from '../Progress';

const ProgressHorizontal = styled(Progress).attrs({
	className: 'c-stepper__progress-bar--horizontal',
	orientation: 'horizontal',
})`
	top: 0.9rem;
	right: 10rem;
	left: 10rem;
	height: 0.2rem;
	background: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3cline x1='0' y1='0' x2='100%25' y2='0' fill='none' stroke='%23d2d2d2' stroke-width='4' stroke-dasharray='2%2c6'/%3e%3c/svg%3e");

	div {
		top: 0;
		height: 0.2rem;
	}
`;

export default ProgressHorizontal;
