import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

import Icon from '@talend/react-components/lib/Icon';
import IconsProvider from '@talend/react-components/lib/IconsProvider';
import { withTranslation } from 'react-i18next';

import { I18N_DOMAIN_FORMS } from '../../UIForm-v2/constants';
import '../../UIForm-v2/translate';

import theme from './ArrayFieldTemplate.scss';

function FieldTemplate({ element, index, cantDelete, t }) {
	const elementClasses = classNames(theme.element, element.itemData.isClosed && theme.closed);
	return (
		<div className={classNames(theme.arrayElement, 'arrayElement', `arrayElement-${index}`)}>
			<div className={theme.control}>
				<button
					type="button"
					name={`btn-move-element-up-${element.index}`}
					disabled={!element.hasMoveUp}
					onClick={element.onReorderClick(element.index, element.index - 1)}
					title={t('ARRAY_FIELD_TEMPLATE_ACTION_MOVE_UP', { defaultValue: 'Move Up' })}
				>
					<Icon name="talend-arrow-left" transform="rotate-90" />
				</button>
				<button
					type="button"
					name={`btn-move-element-down-${element.index}`}
					disabled={!element.hasMoveDown}
					onClick={element.onReorderClick(element.index, element.index + 1)}
					title={t('ARRAY_FIELD_TEMPLATE_ACTION_MOVE_DOWN', { defaultValue: 'Move Down' })}
				>
					<Icon name="talend-arrow-left" transform="rotate-270" />
				</button>
			</div>
			<div className={elementClasses}>{element.children}</div>
			<div className={theme.control}>
				<button
					type="button"
					name={`btn-delete-element-${element.index}`}
					disabled={cantDelete}
					className={theme.delete}
					onClick={element.onDropIndexClick(element.index)}
					title={t('ARRAY_FIELD_TEMPLATE_ACTION_DELETE', { defaultValue: 'Delete' })}
				>
					<Icon name="talend-cross" />
				</button>
			</div>
		</div>
	);
}
if (process.env.NODE_ENV !== 'production') {
	FieldTemplate.propTypes = {
		element: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
		index: PropTypes.number.isRequired,
		cantDelete: PropTypes.bool.isRequired,
		t: PropTypes.func.isRequired,
	};
}

function ArrayFieldTemplate(props) {
	const { items, canAdd, onAddClick, minItems, maxItems, title, t } = props;
	const addBtnClass = classNames(theme.addBtn, 'btn', 'btn-info');
	return (
		<fieldset className={`${theme.ArrayFieldTemplate} ArrayFieldTemplate`} data-content={title}>
			{title && <legend>{title}</legend>}
			<IconsProvider />
			{canAdd && (
				<button
					className={addBtnClass}
					type="button"
					name="btn-new-element"
					disabled={items.length >= maxItems}
					onClick={onAddClick}
				>
					{t('ARRAY_FIELD_TEMPLATE_ACTION_NEW_ELEMENT', {
						defaultValue: 'NEW {{element}}',
						element: props.type,
					})}
				</button>
			)}
			{items &&
				items.map((element, index) => (
					<FieldTemplate
						key={index}
						index={index}
						element={element}
						cantDelete={items.length <= minItems}
						t={t}
					/>
				))}
		</fieldset>
	);
}
if (process.env.NODE_ENV !== 'production') {
	ArrayFieldTemplate.propTypes = {
		type: PropTypes.string.isRequired,
		title: PropTypes.string,
		items: PropTypes.arrayOf(PropTypes.object).isRequired,
		canAdd: PropTypes.func.isRequired,
		onAddClick: PropTypes.func.isRequired,
		minItems: PropTypes.number.isRequired,
		maxItems: PropTypes.number.isRequired,
		t: PropTypes.func.isRequired,
	};
}
export default withTranslation(I18N_DOMAIN_FORMS)(ArrayFieldTemplate);
