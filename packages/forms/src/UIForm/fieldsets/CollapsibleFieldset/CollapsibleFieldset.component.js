import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import CollapsiblePanel, { TYPE_ACTION } from '@talend/react-components/lib/CollapsiblePanel';
import Widget from '../../Widget';

import theme from './CollapsibleFieldset.scss';

function defaultTitle(formData, schema) {
	const title = (schema.items || []).reduce((acc, item) => {
		let value;
		if (item.key) {
			const lastKey = item.key[item.key.length - 1];
			value = formData[lastKey];
		}
		if (item.items) {
			const sub = defaultTitle(value || formData, item);
			if (sub) {
				acc.push(sub);
			}
		} else if (item.titleMap) {
			const mappedValue = item.titleMap.find(map => map.value === value);
			if (mappedValue) {
				acc.push(`${mappedValue.name}`);
			}
		} else if (value) {
			acc.push(`${value}`);
		}
		return acc;
	}, []);
	if (title.length > 0) {
		return title.join(', ');
	}
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
		const { items } = schema;
		const displayAction = actions.map(action => ({
			...action,
			displayMode: TYPE_ACTION,
		}));

		return (
			<fieldset
				className={classNames('form-group', theme['collapsible-panel'], 'collapsible-panel')}
			>
				<CollapsiblePanel
					id={`${id}`}
					header={[{ label: title(value, schema, props.t) }, displayAction]}
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
