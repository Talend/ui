import React from 'react';

import { ColorToken } from '../../types';

import ColorChecker from '../ColorChecker';
import TokenName from '../TokenName';

import S from './ColorCompositions.scss';

const ColorComposition = ({
	icon,
	color,
	background,
	border,
	...rest
}: React.HTMLAttributes<HTMLDivElement> & {
	icon: ColorToken;
	color: ColorToken;
	background: ColorToken;
	border?: ColorToken;
}) => (
	<div className={S.colorContent} style={{ borderColor: border?.value }} {...rest}>
		<div className={S.colorContentRow} style={{ color: color?.value }}>
			<div>
				<div className={S.colorIcon} />
				<TokenName token={icon} />
			</div>
			<div>
				<div className={S.colorContentRow}>
					<div className={S.colorText} />
					{color && background && <ColorChecker text={color} background={background} />}
				</div>
				<TokenName token={color} />
			</div>
		</div>
		{border && <TokenName token={border} />}
	</div>
);

export default ColorComposition;
