import React, { forwardRef, Ref } from 'react';
import TokenName from '../../TokenName';
import { ColorToken } from '../../../../../src/tokens/types';
import { StackHorizontal, StackVertical } from '@talend/design-system';
import CardComposition from '../Card/CardComposition';

import styles from './CompositionListItem.module.scss';

type CompositionListItemPropTypes = {
	background: string;
	tokens: {
		background: string;
		color: string;
		border: string;
		icon: string;
	}[];
	tokenCodex: { [key: string]: ColorToken };
};

const CompositionListItem = forwardRef(
	(props: CompositionListItemPropTypes, ref: Ref<HTMLDListElement>) => {
		const { background, tokens, tokenCodex } = props;
		return (
			<StackVertical gap="M" padding={{ top: 0, left: 0, right: 0, bottom: 'M' }} ref={ref}>
				<h2 className={styles.title}>
					<TokenName token={tokenCodex[background]} />
				</h2>
				<div className={styles.grid}>
					{tokens.map((t, i) => {
						const icon = tokenCodex[t.icon || ''];
						const color = tokenCodex[t.color || ''];
						const bg = tokenCodex[background];
						const border = tokenCodex[t.border];

						const isSemantic = !t.color.includes('Neutral') && !t.color.includes('Assistive');

						return (
							<StackVertical gap="XXS" key={`${t.background}-${i}`}>
								<StackHorizontal gap="L" justify="start" align="center">
									<CardComposition
										key={i}
										textColor={color}
										backgroundColor={bg}
										borderColor={border}
										iconColor={icon}
									/>
									<ul className={styles.list}>
										{t.icon && (
											<li>
												<StackHorizontal gap="XS" align="center">
													<span
														style={{
															background: tokenCodex[t.icon]?.hsla || tokenCodex[t.icon]?.value,
														}}
														className={styles.colorSwatch}
													/>
													<TokenName token={tokenCodex[t.icon]} />
												</StackHorizontal>
											</li>
										)}
										{t.color && (
											<li>
												<StackHorizontal gap="XS" align="center">
													<span
														style={{
															background: tokenCodex[t.color]?.hsla || tokenCodex[t.color]?.value,
														}}
														className={styles.colorSwatch}
													/>
													<TokenName token={tokenCodex[t.color]} />
												</StackHorizontal>
											</li>
										)}
										{t.border && (
											<li>
												<StackHorizontal gap="XS" align="center">
													<span
														style={{
															background: tokenCodex[t.border]?.hsla || tokenCodex[t.border]?.value,
														}}
														className={styles.colorSwatch}
													/>
													<TokenName token={tokenCodex[t.border]} />
												</StackHorizontal>
											</li>
										)}
									</ul>
								</StackHorizontal>
								{isSemantic && (
									<>
										<StackHorizontal gap="L" justify="start" align="center">
											<CardComposition
												key={`${t.background}-${i}`}
												textColor={tokenCodex[`${t.color}Hover`]}
												backgroundColor={bg}
												borderColor={tokenCodex[`${t.border}Hover`]}
												iconColor={tokenCodex[`${t.icon}Hover`]}
												isHover
											/>
											<ul className={styles.list}>
												{t.icon && (
													<li>
														<StackHorizontal gap="XS" align="center">
															<span
																style={{
																	background:
																		tokenCodex[`${t.icon}Hover`]?.hsla ||
																		tokenCodex[`${t.color}Hover`]?.value,
																}}
																className={styles.colorSwatch}
															/>
															<TokenName token={tokenCodex[`${t.icon}Hover`]} />
														</StackHorizontal>
													</li>
												)}
												{t.color && (
													<li>
														<StackHorizontal gap="XS" align="center">
															<span
																style={{
																	background:
																		tokenCodex[`${t.color}Hover`]?.hsla ||
																		tokenCodex[`${t.color}Hover`]?.value,
																}}
																className={styles.colorSwatch}
															/>
															<TokenName token={tokenCodex[`${t.color}Hover`]} />
														</StackHorizontal>
													</li>
												)}
												{t.border && (
													<li>
														<StackHorizontal gap="XS" align="center">
															<span
																style={{
																	background:
																		tokenCodex[`${t.border}Hover`]?.hsla ||
																		tokenCodex[`${t.border}Hover`]?.value,
																}}
																className={styles.colorSwatch}
															/>
															<TokenName token={tokenCodex[`${t.border}Hover`]} />
														</StackHorizontal>
													</li>
												)}
											</ul>
										</StackHorizontal>
										<StackHorizontal gap="L" justify="start" align="center">
											<CardComposition
												key={i}
												textColor={tokenCodex[`${t.color}Active`]}
												backgroundColor={bg}
												borderColor={tokenCodex[`${t.border}Active`]}
												iconColor={tokenCodex[`${t.icon}Active`]}
												isActive
											/>
											<ul className={styles.list}>
												{t.icon && (
													<li>
														<StackHorizontal gap="XS" align="center">
															<span
																style={{
																	background:
																		tokenCodex[`${t.icon}Active`]?.hsla ||
																		tokenCodex[`${t.color}Active`]?.value,
																}}
																className={styles.colorSwatch}
															/>
															<TokenName token={tokenCodex[`${t.icon}Active`]} />
														</StackHorizontal>
													</li>
												)}
												{t.color && (
													<li>
														<StackHorizontal gap="XS" align="center">
															<span
																style={{
																	background:
																		tokenCodex[`${t.color}Active`]?.hsla ||
																		tokenCodex[`${t.color}Active`]?.value,
																}}
																className={styles.colorSwatch}
															/>
															<TokenName token={tokenCodex[`${t.color}Active`]} />
														</StackHorizontal>
													</li>
												)}
												{t.border && (
													<li>
														<StackHorizontal gap="XS" align="center">
															<span
																style={{
																	background:
																		tokenCodex[`${t.border}Active`]?.hsla ||
																		tokenCodex[`${t.border}Active`]?.value,
																}}
																className={styles.colorSwatch}
															/>
															<TokenName token={tokenCodex[`${t.border}Active`]} />
														</StackHorizontal>
													</li>
												)}
											</ul>
										</StackHorizontal>
									</>
								)}
							</StackVertical>
						);
					})}
				</div>
			</StackVertical>
		);
	},
);

export default CompositionListItem;
