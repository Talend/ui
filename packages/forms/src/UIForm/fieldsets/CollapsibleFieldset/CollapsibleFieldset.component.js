import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import { Actions } from '@talend/react-components/lib/Actions';
import ActionIconToggle from '@talend/react-components/lib/Actions/ActionIconToggle';
import Widget from '../../Widget';
import CollapsiblePanel from '@talend/react-components/lib/CollapsiblePanel';

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
            console.log("Pouf")
			this.props.onChange(event, payload);
		}

		render() {
			const { id, schema, value, actions, ...restProps } = this.props;
            const { items } = schema;
            const displayAction = actions.map(it => {it.displayMode='action'; return it})
            
            return (
                <div className={classNames('collapsible-panel', theme['collapsible-panel'])}>
                    <CollapsiblePanel id={`${id}`} 
                                      header={[{ label: title(value, schema) }, displayAction]}
                                      onToggle={this.toggle}
                                      expanded={!this.props.value.isClosed}
                                      >
                                {items.map((itemSchema, index) => (
                                    <Widget {...restProps} id={id} key={index} schema={itemSchema} value={value} />
                                ))}
                    </CollapsiblePanel>
                 </div>
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
