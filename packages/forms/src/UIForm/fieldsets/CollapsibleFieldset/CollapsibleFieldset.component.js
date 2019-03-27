import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import { Actions } from '@talend/react-components/lib/Actions';
import ActionIconToggle from '@talend/react-components/lib/Actions/ActionIconToggle';
import Widget from '../../Widget';

import theme from './CollapsibleFieldset.scss';

function defaultTitle(_, schema) {
	return schema.title;
}

export default function createCollapsibleFieldset(title = defaultTitle) {
	class CollapsibleFieldset extends React.Component {
		constructor(props) {
			super(props);
			this.toggle = this.toggle.bind(this);
		}

		toggle(event) {
			event.stopPropagation();
			event.preventDefault();
			const payload = {
				schema: this.props.schema,
				value: {
					...this.props.value,
					isClosed: !this.props.value.isClosed,
				},
			};
			this.props.onChange(event, payload);
		}

		render() {
			const { id, schema, value, ...restProps } = this.props;
			const { items } = schema;
			const iconTransform = !this.props.value.isClosed ? 'flip-vertical' : null;

			return (
				<fieldset
					className={classNames('form-group', theme['collapsible-panel'], 'collapsible-panel')}
				>
					<div
						onDoubleClick={this.toggle}
						id={id && `${id}__title_bar`}
						role="button"
						className={theme['title-bar']}
					>
						<div // eslint-disable-line jsx-a11y/no-static-element-interactions
							onClick={this.toggle}
							id={id && `${id}__title_wrapper`}
							role="button"
							className={theme.title}
						>
							<legend id={id && `${id}__title`}>{title(value, schema)}</legend>
						</div>
						<div className={theme.actions}>
							{this.props.actions.length > 0 && <Actions actions={this.props.actions} />}
							<ActionIconToggle
								className={theme.collapse}
								onClick={this.toggle}
								id={id && `${id}__collapse`}
								label="Collapse"
								type="button"
								active={!value.isClosed}
								icon="talend-caret-down"
								iconTransform={iconTransform}
							/>
						</div>
					</div>
					{!value.isClosed && (
						<div className={theme.body}>
							{items.map((itemSchema, index) => (
								<Widget {...restProps} id={id} key={index} schema={itemSchema} value={value} />
							))}
						</div>
					)}
				</fieldset>
			);
		}
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
