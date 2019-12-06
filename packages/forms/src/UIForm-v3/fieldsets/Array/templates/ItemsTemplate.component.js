import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import AddButton from '../buttons/AddButton.component';
import Items from '../Items.component';
import MoveUpButton from '../buttons/MoveUpButton.component';
import MoveDownButton from '../buttons/MoveDownButton.component';
import DeleteButton from '../buttons/DeleteButton.component';

import { I18N_DOMAIN_FORMS } from '../../../constants';
import theme from './ItemsTemplate.scss';

export default function ItemsTemplate({ id, children }) {
	const { t } = useTranslation(I18N_DOMAIN_FORMS);
	return (
		<React.Fragment>
			<div className={theme.toolbar}>
				<AddButton />
			</div>
			<Items>
				{index => (
					<div className={theme.item}>
						<div className={theme['item-toolbar']}>
							<MoveUpButton
								index={index}
								id={`${id}-move-up-${index}`}
								label={t('TF_ARRAY_ITEM_MOVE_UP', {
									defaultValue: 'Move item {{index}} up',
									index,
								})}
								hideLabel
							/>
							<MoveDownButton
								index={index}
								id={`${id}-move-down-${index}`}
								label={t('TF_ARRAY_ITEM_MOVE_DOWN', {
									defaultValue: 'Move item {{index}} down',
									index,
								})}
								hideLabel
							/>
						</div>
						<div className={theme.main}>{children(index)}</div>
						<div className={theme['item-toolbar']}>
							<DeleteButton
								index={index}
								id={`${id}-delete-${index}`}
								label={t('TF_ARRAY_ITEM_DELETE', {
									defaultValue: 'Delete item {{index}}',
									index,
								})}
								hideLabel
							/>
						</div>
					</div>
				)}
			</Items>
		</React.Fragment>
	);
}

if (process.env.NODE_ENV !== 'production') {
	ItemsTemplate.propTypes = {
		children: PropTypes.func.isRequired,
		id: PropTypes.string.isRequired,
	};
}
