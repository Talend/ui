import { useState } from 'react';
import type { MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';

import { I18N_DOMAIN_DESIGN_SYSTEM } from '../../../../constants';
import { Clickable } from '../../../../Clickable';
import { Tooltip } from '../../../../Tooltip';
import { SizedIcon } from '../../../../Icon';
import styles from './passwordButton.module.scss';
import { TooltipChildrenFnProps, TooltipChildrenFnRef } from '../../../../Tooltip/Tooltip';

export default function useRevealPassword() {
	const [revealed, setRevealed] = useState(false);
	const currentType = revealed ? 'text' : 'password';
	const { t } = useTranslation(I18N_DOMAIN_DESIGN_SYSTEM);
	const showMsg = t('FORM_PASSWORD_SHOW', { defaultValue: 'Show password' });
	const hideMsg = t('FORM_PASSWORD_HIDE', { defaultValue: 'Hide password' });

	function onReveal(event: MouseEvent<any>) {
		event.preventDefault();
		setRevealed(prevState => !prevState);
	}

	function onReset() {
		setRevealed(() => false);
	}

	function RevealPasswordButton(props: {
		onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
		disabled?: boolean;
	}) {
		const { onClick, disabled } = props;
		return (
			<Tooltip title={revealed ? hideMsg : showMsg} placement="top">
				{(triggerProps: TooltipChildrenFnProps, ref: TooltipChildrenFnRef) => (
					<Clickable
						{...triggerProps}
						ref={ref}
						className={styles.button}
						onMouseDown={e => {
							onReveal(e);
							if (onClick) {
								onClick(e);
							}
						}}
						tabIndex={-1}
						aria-hidden
						data-testid="form.password.reveal"
						disabled={disabled}
					>
						<SizedIcon size="M" name={revealed ? 'eye-slash' : 'eye'} />
					</Clickable>
				)}
			</Tooltip>
		);
	}

	return { currentType, onReset, RevealPasswordButton };
}
