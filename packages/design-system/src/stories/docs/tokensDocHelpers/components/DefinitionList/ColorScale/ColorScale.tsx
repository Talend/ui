import classnames from 'classnames';
import { ColorToken, Token } from '../../../../../../src/tokens/types';
import { getScssName } from '../../../TokenFormatter';
import { SizedIcon, Tooltip } from '@talend/design-system';

import styles from './ColorScale.module.scss';
import useCopyValue from '../DefinitionListItem/useCopyValue';

function ColorBlock({ token }: { token: Token }) {
	const { copy, isCopied } = useCopyValue();

	return (
		<>
			<Tooltip
				placement="bottom"
				title={<span className={styles.colorScale_tooltip}>Copy {getScssName(token?.name)}</span>}
			>
				<button
					onClick={() => copy(getScssName(token?.name))}
					className={styles.colorScale_element}
					style={{ backgroundColor: token.value }}
				>
					<span className={styles.icons}>
						<span className={classnames(styles.copyIcon, { [styles.copyIcon_hidden]: isCopied })}>
							<SizedIcon size={token.name === 'coralSizingMinimal' ? 'XS' : 'S'} name="copy" />
						</span>

						<span
							className={classnames(styles.validIcon, { [styles.validIcon_visible]: isCopied })}
						>
							<SizedIcon size={token.name === 'coralSizingMinimal' ? 'XS' : 'S'} name="check" />
						</span>
					</span>
				</button>
			</Tooltip>
		</>
	);
}

function ColorScale({ tokens }: { tokens: ColorToken[] }) {
	return (
		<ul className={styles.colorScale}>
			{tokens.map((token, index) => (
				<li key={`${token.name}-${index}`}>
					<ColorBlock token={token} />
				</li>
			))}
		</ul>
	);
}

export default ColorScale;
