import { SizedIcon } from '@talend/design-system';
import style from './TokenValue.module.scss';

type TokenValueProps = {
	children: string;
	lang?: string;
};

function copy(svalue: string) {
	let value = svalue;
	if (Array.isArray(svalue)) {
		value = svalue.join('');
	}

	if (navigator.clipboard) {
		navigator.clipboard.writeText(value);
	}
}

export function TokenValue({ children, lang }: TokenValueProps) {
	return (
		<button
			className={style.btn}
			style={{ border: 'none', background: 'none' }}
			onClick={() => copy(children)}
		>
			<span className={style.lang}>{lang}</span>
			<span>{children}</span>
			<SizedIcon size="S" name="copy" />
		</button>
	);
}
