import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import { Actions } from '@talend/react-components/lib/Actions';
import { useTranslation } from 'react-i18next';
import CollapsiblePanel, { TYPE_ACTION } from '@talend/react-components/lib/CollapsiblePanel';
import Widget from '../../Widget';
import { I18N_DOMAIN_FORMS } from '../../../constants';

import theme from './CollapsibleFieldset.scss';

function defaultTitle(_, schema) {
	return schema.title;
}

export default function createCollapsibleFieldset(title = defaultTitle) {
	function CollapsibleFieldset(props) {
		function toggle(event) {
			event.stopPropagation();
			event.preventDefault();
			const payload = {
				schema: props.schema,
				value: {
					...props.value,
					isClosed: !props.value.isClosed,
				},
			};
			props.onChange(event, payload);
		}

		const { id, schema, value, actions, ...restProps } = props;
		const { t } = useTranslation(I18N_DOMAIN_FORMS);
		const { items } = schema;
		const iconTransform = !props.value.isClosed ? 'flip-vertical' : null;
		const expandLabel = t('FIELDSET_EXPAND', { defaultValue: 'Expand' });
		const collapseLabel = t('FIELDSET_COLLAPSE', { defaultValue: 'Collapse' });
		const displayAction = actions.map(action => {
			return { ...action, displayMode: TYPE_ACTION };
		});

		return (
			<fieldset className={classNames('form-group', theme['collapsible-panel'], 'collapsible-panel')}>
				<CollapsiblePanel id={`${id}`}
				                  header={[{ label: title(value, schema) }, displayAction]}
				                  onToggle={toggle}
				                  expanded={!value.isClosed}
				>
					{items.map((itemSchema, index) => (
						<Widget {...restProps} id={id} key={index} schema={itemSchema} value={value} />
					))}
				</CollapsiblePanel>
			</fieldset>
		);
	}

	CollapsibleFieldset.defaultProps = {
		value: {},
		actions: [],
	};
	CollapsibleFieldset.isCloseable = true;

	if (process.env.NODE_ENV !== 'production') {
		CollapsibleFieldset.propTypes = {
			id: PropTypes.string,
			onChange: PropTypes.func.isRequired,
			schema: PropTypes.shape({
				items: PropTypes.array.isRequired,
			}).isRequired,
			value: PropTypes.object,
			actions: PropTypes.array,
		};
	}

	return CollapsibleFieldset;
}
