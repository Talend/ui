import React from 'react';
import {ColorToken} from '../types';
import ColorDescription  from './ColorDescription';

import S from './Tokens.scss';

const ColorCard = ({ icon, color }: { icon: ColorToken, color: ColorToken}) => (
    <div className={S.colorContent} style={{ color: color?.value}}>
        <div>
			<span
                className={S.colorIcon}
                aria-hidden
                style={{
                    background: `${icon?.value}`
                }}
			/>
            <ColorDescription token={icon} />
        </div>
        <div>
			<span
                className={S.colorText}
                aria-hidden
			/>
            <ColorDescription token={color} />
        </div>
    </div>
);

export default ColorCard;
