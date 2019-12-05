import React, { useContext } from 'react';
import { Action } from '@talend/react-components/lib/Actions';
import { useTranslation } from 'react-i18next';
import { I18N_DOMAIN_FORMS } from '../../constants';
import ArrayContext from './context';

import theme from './Array.scss';

export default function AddButton(props) {
	const { addItem } = useContext(ArrayContext);
	const { t } = useTranslation(I18N_DOMAIN_FORMS);
	return (
		<Action
			type="button"
			className={theme.add}
			bsStyle={'info'}
			onClick={addItem}
			label={t('ARRAY_ADD_ELEMENT', { defaultValue: 'Add' })}
			{...props}
		/>
	);
}
