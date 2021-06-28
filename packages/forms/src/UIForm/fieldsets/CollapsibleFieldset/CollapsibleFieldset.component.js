import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import { InlineMessage } from '@talend/react-components';
import CollapsiblePanel from '@talend/react-components/lib/CollapsiblePanel';
import get from 'lodash/get';
import Widget from '../../Widget';
import { generateDescriptionId } from '../../Message/generateId';

import theme from './CollapsibleFieldset.scss';

/**
 * @return {Arary<string>} itemkey
 * @param {Array<string>} key within an array
 */
function getDrillKey(key) {
	let stopped = false;

	return key.reduceRight((acc, value) => {
		if (stopped) {
			return acc;
		}
		if (typeof value === 'number') {
			// finished
			stopped = true;
			return acc;
		}
		acc.splice(0, 0, value);
		return acc;
	}, []);
}

export function defaultTitle(formData, schema, options) {
	const title = (schema.items || []).reduce((acc, item) => {
		let value;
		if (item.key) {
			const lastKey = getDrillKey(item.key);
			value = get(formData, lastKey.join('.'));
		}
		if (item.items) {
			const sub = defaultTitle(formData, item, options);
			if (sub) {
				acc.push(sub);
			}
		}
		if (item.titleMap && item.titleMap.length > 0) {
			const mappedValue = item.titleMap.find(map => map.value === value);
			if (mappedValue) {
				acc.push(mappedValue.name);
			}
		} else if (value) {
			acc.push(value);
		}
		return acc;
	}, []);
	if (title.length > 0) {
		return title.join(options?.separator || schema.options?.separator || ', ');
	}

	if (options?.emptyTitleFallback) {
		return options.emptyTitleFallback;
	}

	if (schema.options?.emptyTitleFallback) {
		return schema.options.emptyTitleFallback;
	}

	return schema.title;
}

/**
 * createCollapsibleFieldset create a widget with a title function
 * @param {function} title the function called by the component to compute the title
 * @return {function} CollapsibleFieldset react component
 */
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
			displayMode: CollapsiblePanel.displayModes.TYPE_ACTION,
		}));

		return (
			<fieldset
				className={classNames('form-group', theme['collapsible-panel'], 'collapsible-panel')}
			>
				<CollapsiblePanel
					id={`${id}`}
					header={[{ label: title(value, schema) }, displayAction]}
					onToggle={toggle}
					expanded={!value.isClosed}
				>
					{schema.description ? (
						<InlineMessage
							key="description"
							id={generateDescriptionId(id)}
							description={schema.description}
							small
							role={undefined}
							aria-live={undefined}
						/>
					) : (
						''
					)}
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
				description: PropTypes.string,
			}).isRequired,
			value: PropTypes.object,
			actions: PropTypes.array,
		};
	}

	return CollapsibleFieldset;
}
