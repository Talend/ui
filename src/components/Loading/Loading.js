import React from 'react';
import styled from 'styled-components';

const SVG = styled.svg(
	({ theme }) => `
		path {
			fill: currentColor;
		}
`,
);

function Loading(props) {
	return (
		<SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" {...props}>
			<g>
				<path
					d="M8 0a8 8 0 100 16A8 8 0 008 0zm0 14.227A6.227 6.227 0 118 1.773a6.227 6.227 0 010 12.454z"
					opacity=".2"
				/>
				<path d="M11.11 2.611l.886-1.534A7.951 7.951 0 008 0v1.773c1.134 0 2.195.308 3.11.838z">
					<animateTransform
						attributeName="transform"
						type="rotate"
						from="0 8 8"
						to="360 8 8"
						dur=".85s"
						repeatCount="indefinite"
					/>
				</path>
			</g>
		</SVG>
	);
}

export default Loading;
