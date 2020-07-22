import React from 'react';
import styled from 'styled-components';
import { Button as ReakitButton, VisuallyHidden } from 'reakit';

const Button = styled(ReakitButton)`
	display: flex;
	align-items: center;
	justify-content: center;
	position: fixed;
	right: 5rem;
	bottom: 2rem;
	padding: 0.5rem 1rem;
	background: #fff;
	border-radius: 1rem;
	transition: background 0.3s;

	&:hover {
		background: #efefef;
	}

	span {
		padding: 0.5rem;
	}
`;

function BackToTop() {
	const [visible, isVisible] = React.useState(false);

	function onScroll() {
		isVisible(() => window.pageYOffset > 300);
	}

	React.useLayoutEffect(() => {
		document.addEventListener('scroll', onScroll);
		return () => document.removeEventListener('scroll', onScroll);
	}, []);

	if (!visible) {
		return null;
	}

	return (
		<Button onClick={() => window.scroll({ top: 0, left: 0, behavior: 'smooth' })}>
			<span aria-hidden={true}>↑</span>
			Back to top <VisuallyHidden>of the page</VisuallyHidden>
		</Button>
	);
}

export default BackToTop;
