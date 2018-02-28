import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { translate } from 'react-i18next';
import { Action } from '@talend/react-components/lib/Actions';
import ArrayItem from './ArrayItem.component';
import I18N_DOMAIN_FORMS from '../../../constants';
import { DEFAULT_I18N, getDefaultTranslate } from '../../../translate';

import theme from './Array.scss';

export function DefaultArrayTemplate(props) {
	const { canReorder, id, onAdd, onRemove, onReorder, renderItem, schema, t, value } = props;
	return (
		<fieldset
			className={classNames(theme['tf-array-fieldset'], 'tf-array-fieldset')}
			data-content={schema.title}
		>
			{schema.title && <legend>{schema.title}</legend>}
			<Action
				className={classNames(theme['tf-array-add'], 'tf-array-add')}
				bsStyle={'info'}
				onClick={onAdd}
				label={t('ARRAY_ADD_ELEMENT', { defaultValue: 'New Element' })}
			/>
			<ol id={id} className={classNames(theme['tf-array'], 'tf-array')}>
				{value.map((itemValue, index) => (
					<li className={classNames(theme.item, 'item', `item-${index}`)} key={index}>
						<ArrayItem
							hasMoveDown={index < value.length - 1}
							hasMoveUp={index > 0}
							id={id && `${id}-control-${index}`}
							index={index}
							onRemove={onRemove}
							onReorder={canReorder && onReorder}
							isClosed={itemValue.isClosed}
						>
							{renderItem(index)}
						</ArrayItem>
					</li>
				))}
			</ol>
		</fieldset>
	);
}

DefaultArrayTemplate.defaultProps = {
	t: getDefaultTranslate,
};

if (process.env.NODE_ENV !== 'production') {
	DefaultArrayTemplate.propTypes = {
		canReorder: PropTypes.bool,
		id: PropTypes.string,
		onAdd: PropTypes.func.isRequired,
		onRemove: PropTypes.func.isRequired,
		onReorder: PropTypes.func.isRequired,
		renderItem: PropTypes.func.isRequired,
		schema: PropTypes.object.isRequired,
		value: PropTypes.arrayOf(PropTypes.object).isRequired,
		t: PropTypes.func.isRequired,
	};
}

export default translate(I18N_DOMAIN_FORMS, { i18n: DEFAULT_I18N })(DefaultArrayTemplate);
