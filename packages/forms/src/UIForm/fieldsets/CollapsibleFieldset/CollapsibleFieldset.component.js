import PropTypes from 'prop-types';
import React from 'react';
import Icon from '@talend/react-components/lib/Icon';
import Widget from '../../Widget';

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
				schema: this.props,
				value: !this.props.value.isClosed,
			};
			this.props.onChange(event, payload);
			// this.props.onFinish(event, payload);
		}

		render() {
			const { id, schema, value, ...restProps } = this.props;
			const { items } = schema;
			const iconTransform = !this.props.value.isClosed ? 'flip-vertical' : '';

			return (
				<fieldset className="form-group">
					<div
						onDoubleClick={this.toggle}
						id={id && `${id}__title_bar`}
						role="button"
					>
						<div
							onClick={this.toggle}
							id={id && `${id}__title_wrapper`}
							role="button"
						>
							<legend id={id && `${id}__title`}>
								{title(value, schema)}
							</legend>
						</div>
						<button
							onClick={this.toggle}
							id={id && `${id}__collapse`}
							title="Collapse"
							type="button"
							className="toggle"
						>
							<Icon name="talend-caret-down" transform={iconTransform} />
						</button>
					</div>
					{!value.isClosed && items.map((itemSchema, index) => (
						<Widget
							{...restProps}
							id={id}
							key={index}
							schema={itemSchema}
							value={value}
						/>
					))}
				</fieldset>
			);
		}
	}

	if (process.env.NODE_ENV !== 'production') {
		CollapsibleFieldset.propTypes = {
			id: PropTypes.string,
			onChange: PropTypes.func.isRequired,
			schema: PropTypes.shape({
				items: PropTypes.array.isRequired,
			}).isRequired,
			value: PropTypes.object,
		};
	}

	return CollapsibleFieldset;
}

