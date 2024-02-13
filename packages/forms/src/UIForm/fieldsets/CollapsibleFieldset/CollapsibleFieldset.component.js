import { useCallback } from 'react';

import classNames from 'classnames';
import get from 'lodash/get';
import PropTypes from 'prop-types';

import { CollapsiblePanel, InlineMessageInformation } from '@talend/design-system';
import { StackVertical } from '@talend/design-system';

import { generateDescriptionId } from '../../Message/generateId';
import Widget from '../../Widget';

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
// eslint-disable-next-line @typescript-eslint/default-param-last
export default function createCollapsibleFieldset(title = defaultTitle) {
	function CollapsibleFieldset(props) {
		const { id, schema, value, actions, index, ...restProps } = props;
		const { items, managed } = schema;

		function onToggleClick() {
			const payload = {
				schema: props.schema,
				value: {
					...props.value,
					isClosed: !props.value.isClosed,
				},
			};

			props.onChange(undefined, payload);
		}

		const getAction = useCallback(() => {
			if (!actions || actions.length === 0 || actions[0] === undefined) {
				return undefined;
			}

			const action = actions[0];

			return {
				...action,
				tooltip: action.tooltip || action.label,
				callback: action.onClick,
			};
		}, [actions]);

		return (
			<fieldset className={classNames('form-group', 'collapsible-panel')}>
				<CollapsiblePanel
					title={title(value, schema)}
					onToggleExpanded={onToggleClick}
					index={index}
					managed={!!managed}
					expanded={!value.isClosed}
					action={getAction()}
				>
					{schema.description ? (
						<InlineMessageInformation
							key="description"
							id={generateDescriptionId(id)}
							description={schema.description}
							role={undefined}
							aria-live={undefined}
						/>
					) : (
						''
					)}
					<StackVertical gap="S" align="stretch">
						{items.map((itemSchema, idx) => (
							<Widget
								{...restProps}
								id={id}
								key={`${id}-${idx}`}
								schema={itemSchema}
								value={value}
							/>
						))}
					</StackVertical>
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
			index: PropTypes.number,
			onChange: PropTypes.func.isRequired,
			schema: PropTypes.shape({
				items: PropTypes.array.isRequired,
				managed: PropTypes.bool,
				description: PropTypes.string,
			}).isRequired,
			value: PropTypes.object,
			actions: PropTypes.array,
		};
	}

	return CollapsibleFieldset;
}
