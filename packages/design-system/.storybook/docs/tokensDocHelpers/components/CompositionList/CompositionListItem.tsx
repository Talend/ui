import React, { forwardRef, Ref } from 'react';
import TokenName from '../../TokenName';
import { ColorToken } from '../../../../../src/tokens/types';
import { StackHorizontal, StackVertical } from '../../../../../src';
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
			<StackVertical gap="M" as="dl" padding={{ top: 0, left: 0, right: 0, bottom: 'M' }} ref={ref}>
				<dt>
					<TokenName token={tokenCodex[background]} />
				</dt>
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
									<div>
										{t.icon && (
											<dd>
												<StackHorizontal gap="XS" align="center">
													<span
														style={{
															background: tokenCodex[t.icon]?.hsla || tokenCodex[t.icon]?.value,
														}}
														className={styles.colorSwatch}
													/>
													<TokenName token={tokenCodex[t.icon]} />
												</StackHorizontal>
											</dd>
										)}
										{t.color && (
											<dd>
												<StackHorizontal gap="XS" align="center">
													<span
														style={{
															background: tokenCodex[t.color]?.hsla || tokenCodex[t.color]?.value,
														}}
														className={styles.colorSwatch}
													/>
													<TokenName token={tokenCodex[t.color]} />
												</StackHorizontal>
											</dd>
										)}
										{t.border && (
											<dd>
												<StackHorizontal gap="XS" align="center">
													<span
														style={{
															background: tokenCodex[t.border]?.hsla || tokenCodex[t.border]?.value,
														}}
														className={styles.colorSwatch}
													/>
													<TokenName token={tokenCodex[t.border]} />
												</StackHorizontal>
											</dd>
										)}
									</div>
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
											<div>
												{t.icon && (
													<dd>
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
													</dd>
												)}
												{t.color && (
													<dd>
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
													</dd>
												)}
												{t.border && (
													<dd>
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
													</dd>
												)}
											</div>
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
											<div>
												{t.icon && (
													<dd>
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
													</dd>
												)}
												{t.color && (
													<dd>
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
													</dd>
												)}
												{t.border && (
													<dd>
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
													</dd>
												)}
											</div>
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
