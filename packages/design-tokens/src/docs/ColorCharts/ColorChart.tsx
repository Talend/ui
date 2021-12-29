import React from 'react';

import { ColorToken } from '../../types';

const AnimatedRect = ({
	chartColor,
	height,
	begin,
}: {
	chartColor: ColorToken;
	height: string;
	begin: string;
}) => {
	return (
		<rect fill={chartColor?.value} y="50%" width={0} height="30">
			<animate
				attributeType="CSS"
				attributeName="width"
				from="0"
				to={height}
				dur="1s"
				begin={begin}
				fill="freeze"
				calcMode="spline"
				keySplines="0.4 0 0.2 1; 0.4 0 0.2 1"
			/>
		</rect>
	);
};

const ColorChart = ({
	chartColorWeak,
	chartColor,
	chartColorStrong,
}: {
	chartColorWeak: ColorToken;
	chartColor: ColorToken;
	chartColorStrong: ColorToken;
}) => {
	return (
		<svg height="100%" width="100%">
			<g>
				<AnimatedRect chartColor={chartColorWeak} height="100%" begin="0s" />
				<AnimatedRect chartColor={chartColorStrong} height="80%" begin="0.1s" />
				<AnimatedRect chartColor={chartColor} height="65%" begin="0.2s" />
			</g>
		</svg>
	);
};

export default ColorChart;
