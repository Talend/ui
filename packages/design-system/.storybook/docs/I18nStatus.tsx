import React from 'react';

import Link from './Link';
import { Status, toEmoji } from './Statuses';

const I18nIcon = React.memo(() => (
	<svg
		version="1.0"
		xmlns="http://www.w3.org/2000/svg"
		width="80.000000pt"
		height="80.000000pt"
		viewBox="0 0 80.000000 80.000000"
		preserveAspectRatio="xMidYMid meet"
	>
		<g
			transform="translate(0.000000,80.000000) scale(0.100000,-0.100000)"
			fill="#000000"
			stroke="none"
		>
			<path
				d="M294 765 c-15 -39 1 -45 116 -45 90 0 112 3 116 15 14 35 -14 45
	-123 45 -83 0 -105 -3 -109 -15z"
			/>
			<path
				d="M330 629 c0 -53 -10 -87 -75 -249 -104 -261 -106 -266 -95 -296 17
	-44 62 -54 249 -54 93 0 181 4 194 9 36 14 57 39 57 69 0 15 -36 119 -80 231
-74 190 -80 210 -80 278 l0 73 -85 0 -85 0 0 -61z m160 -184 c19 -49 -25 -92
-61 -59 -10 9 -19 23 -19 31 0 52 62 74 80 28z m-120 -35 c22 -40 -26 -80 -58
-48 -25 25 -6 68 30 68 9 0 22 -9 28 -20z m133 -101 c31 -7 61 -17 66 -23 18
-23 62 -147 59 -168 -2 -11 -16 -30 -31 -42 -26 -19 -42 -21 -187 -21 -145 0
-161 2 -187 21 -39 29 -39 60 -3 147 31 75 31 75 78 85 66 14 139 14 205 1z"
			/>
			<path
				d="M283 244 c-6 -17 12 -34 37 -34 25 0 43 17 37 34 -4 10 -18 16 -37
16 -19 0 -33 -6 -37 -16z"
			/>
			<path
				d="M443 244 c-6 -17 12 -34 37 -34 25 0 43 17 37 34 -4 10 -18 16 -37
16 -19 0 -33 -6 -37 -16z"
			/>
			<path
				d="M211 599 c-17 -17 -31 -34 -31 -39 0 -20 68 -27 101 -10 13 8 19 21
19 45 0 32 -3 35 -29 35 -20 0 -40 -10 -60 -31z"
			/>
			<path
				d="M520 595 c0 -24 6 -37 19 -45 33 -17 101 -10 101 10 0 21 -63 70 -91
70 -26 0 -29 -3 -29 -35z"
			/>
		</g>
	</svg>
));

const I18nStatus = ({ status, ...props }: React.FunctionComponent & { status?: Status }) => {
	return (
		<Link {...props}>
			<I18nIcon aria-hidden />
			<span>I18n</span>
			{status && <sub>{toEmoji(status)}</sub>}
		</Link>
	);
};

export default React.memo(I18nStatus);
