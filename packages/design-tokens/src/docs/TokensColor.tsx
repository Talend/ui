// eslint-disable-next-line import/no-extraneous-dependencies
import React from 'react';
import {TokensProps} from './TokensTypes';
import {ColorToken} from '../types';
import S from './Tokens.scss';
import CompositeColors from './CompositeColors.json';
import TokenSkeleton from './TokenSkeleton';
import ColorDescription from './ColorDescription';
import ColorCard from './ColorCard';
import ColorChecker from './ColorChecker';

const SemanticColors = ['Accent', 'Danger', 'Warning', 'Success', 'Beta'];

const DefaultCharts = ['Neutral', 'Default', ''];

const SemanticCharts = ['Success', 'Warning', 'Danger'];

const OrderedCharts = ['Color00', 'Color01', 'Color02', 'Color03', 'Color04', 'Color05', 'Color06', 'Color07', 'Color08', 'Color09'];

const ColorTokens = ({ tokens, filter }: TokensProps) => {
    const colorTokens = tokens.reduce((acc:Record<string, ColorToken>, curr:ColorToken) => {
        acc[curr.name.replace('coralColor', '')] = curr;
        return acc;
    }, {});
    return (
        <div className={S.colorGrid}>
            {
                CompositeColors.map(({icon: iconK = '', color: colorK = '', background: backgroundK = '', border:borderK = ''}, key) => {
                    if (!backgroundK) {
                        return <div />;
                    }

                    const icon = colorTokens[iconK];
                    const iconHover = colorTokens[`${iconK}Hover`];
                    const iconActive = colorTokens[`${iconK}Active`];
                    const color = colorTokens[colorK];
                    const colorHover = colorTokens[`${colorK}Hover`];
                    const colorActive = colorTokens[`${colorK}Active`];
                    const background = colorTokens[backgroundK];
                    const backgroundHover = colorTokens[`${backgroundK}Hover`];
                    const backgroundActive = colorTokens[`${backgroundK}Active`];
                    const border = colorTokens[borderK];
                    const borderHover = colorTokens[`${borderK}Hover`];
                    const borderActive = colorTokens[`${borderK}Active`];

                    const hasSemanticColor = SemanticColors.some(semanticColor => colorK?.includes(semanticColor));
                    const hasSemanticBackground = SemanticColors.some(semanticColor => backgroundK?.includes(semanticColor));

                    return (
                        <div className={S.colorSwatch}>
                            {(hasSemanticBackground ? ['DEFAULT', 'HOVER', 'ACTIVE'] : ['DEFAULT']).map(
                                (state, appendix) => {
                                    let iconColor = icon;
                                    let textColor = color;
                                    let backgroundColor = background;
                                    let borderColor = border;

                                    switch (state) {
                                        case 'HOVER':
                                            iconColor = iconHover;
                                            textColor = colorHover;
                                            backgroundColor = backgroundHover;
                                            borderColor = borderHover;
                                            break;
                                        case 'ACTIVE':
                                            iconColor = iconActive;
                                            textColor = colorActive;
                                            backgroundColor = backgroundActive;
                                            borderColor = borderActive;
                                            break;
                                        default:
                                            break;
                                    }

                                    const shouldDisplay = !filter.length || [iconColor, textColor, backgroundColor, borderColor].some(c => c?.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
                                        ||c?.hex.toLocaleLowerCase().includes(filter.toLocaleLowerCase()));

                                    return shouldDisplay ? (
                                        <div
                                            key={`${key}${appendix}`}
                                            className={S.colorBackground}
                                            style={{
                                                color: `${textColor?.value}`,
                                                background: `${backgroundColor?.value}`,
                                                borderColor: `${borderColor?.value}`
                                            }}
                                        >
                                            <ColorDescription token={backgroundColor} />

                                            <ColorCard icon={iconColor} color={textColor} />

                                            {(hasSemanticColor && ! hasSemanticBackground) && (
                                                <>
                                                    <ColorCard icon={iconHover} color={colorHover}  />
                                                    <ColorCard icon={iconActive} color={colorActive} />
                                                </>
                                            )}

                                            <ColorDescription className={S.colorBorder} token={borderColor} />

                                            <ColorChecker text={textColor} background={backgroundColor} />
                                        </div>
                                    ) : <TokenSkeleton />;
                                }
                            )}
                        </div>
                    );
                })
            }
            {
                [DefaultCharts, SemanticCharts, OrderedCharts].map(charts => charts
                    .map(name => {
                        if(name.length === 0) return <div />;
                        const chartColorWeak = colorTokens[`Charts${name}Weak`];
                        const chartColorStrong = colorTokens[`Charts${name}Strong`];
                        const chartColor = colorTokens[`Charts${name}`];
                        return(
                            <div
                                className={S.colorBackground}
                            >
                                <svg height='100%' width='30px' style={{ transform: 'rotate(180deg)'}}>
                                    <g>
                                        <rect fill={chartColorWeak?.value} height='100%' width='30'>
                                            <animate
                                                attributeType="CSS"
                                                attributeName="height"
                                                from="0"
                                                to="100%"
                                                dur="1s"
                                                fill="freeze"
                                                calcMode="spline"
                                                keySplines="0.4 0 0.2 1; 0.4 0 0.2 1"
                                            />
                                        </rect>
                                        <rect fill={chartColorStrong?.value} height='80%' width='30'>
                                            <animate
                                                attributeType="CSS"
                                                attributeName="height"
                                                from="0"
                                                to="80%"
                                                dur="1s"
                                                begin="0.1s"
                                                fill="freeze"
                                                calcMode="spline"
                                                keySplines="0.4 0 0.2 1; 0.4 0 0.2 1"
                                            />
                                        </rect>
                                        <rect fill={chartColor?.value} height='75%' width='30'>
                                            <animate
                                                attributeType="CSS"
                                                attributeName="height"
                                                from="0"
                                                to="25%"
                                                dur="1s"
                                                begin="0.2s"
                                                fill="freeze"
                                                calcMode="spline"
                                                keySplines="0.4 0 0.2 1; 0.4 0 0.2 1"
                                            />
                                        </rect>
                                    </g>
                                </svg>
                                <ColorDescription token={chartColor} />
                                <ColorDescription token={chartColorStrong} />
                                <ColorDescription token={chartColorWeak} />
                            </div>
                        );
                    }))}
        </div>
    );
};
export default ColorTokens;
