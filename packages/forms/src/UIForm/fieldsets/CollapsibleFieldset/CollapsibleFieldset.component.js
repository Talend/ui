import React, { PropTypes } from 'react';
import { Icon } from 'react-talend-components';

import Fieldset from '../Fieldset';

function createCollapsibleFieldset(title) {
	class CollapsibleFieldset extends React.Component {
		constructor(props) {
			super(props);
			this.toggle = this.toggle.bind(this);
		}

		toggle(event) {
			const newValue = {
				...this.props.value,
				isClosed: !this.props.value.isClosed,
			};
			this.props.onChange(event, this.schema, newValue);
		}

		render() {
			const { id, value } = this.props;
			const iconTransform = !value.isClosed ? 'flip-vertical' : '';

			return (
				<fieldset>
					<div onDoubleClick={this.toggle} id={id && `${id}__title_bar`} role="button">
						{
							title &&
							<div onClick={this.toggle} id={id && `${id}__title_wrapper`} role="button">
								<legend
									id={`id && ${id}__title`}
									title={title(value)}
								/>
							</div>
						}
						<button
							onClick={this.toggle} id={id && `${id}__collapse`} title="Collapse"
							className="toggle"
						>
							<Icon name="talend-caret-down" transform={iconTransform} />
						</button>
					</div>
					{
						!value.isClosed && <Fieldset {...this.props} />
					}
				</fieldset>
			);
		}
	}

	CollapsibleFieldset.defaultProps = {
		value: {},
	};

	if (process.env.NODE_ENV !== 'production') {
		CollapsibleFieldset.propTypes = {
			id: PropTypes.string,
			onChange: PropTypes.func.isRequired,
			value: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
		};
	}

	return CollapsibleFieldset;
}

export default createCollapsibleFieldset;
