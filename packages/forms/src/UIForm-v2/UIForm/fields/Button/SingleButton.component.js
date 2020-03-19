import PropTypes from 'prop-types';
import React from 'react';
import Action from '@talend/react-components/lib/Actions/Action';
import Inject from '@talend/react-components/lib/Inject';
import classNames from 'classnames';

export default class SingleButton extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.onClick = this.onClick.bind(this);
	}

	onClick(event) {
		const schema = this.props.schema;
		const type = schema.type || 'button';
		if (type === 'button' && schema.triggers) {
			this.setState({ inProgress: true });
			this.props
				.onTrigger(event, { trigger: schema.triggers[0], schema })
				.finally(() => this.setState({ inProgress: false }));
		} else if (this.props.onClick) {
			this.props.onClick(event, schema);
		} else {
			this.setState({ error: 'No handler' });
		}
	}

	render() {
		const { className, id, schema, getComponent } = this.props;
		const { type = 'button', title, label, inProgress, ...props } = schema;
		const Renderer = Inject.getAll(getComponent, { Action });
		return (
			<Renderer.Action
				{...props}
				id={id}
				className={classNames('btn', className)}
				label={label || title}
				onClick={this.onClick}
				type={type}
				inProgress={this.state.inProgress || inProgress}
			/>
		);
	}
}

if (process.env.NODE_ENV !== 'production') {
	SingleButton.propTypes = {
		className: PropTypes.string,
		id: PropTypes.string,
		onTrigger: PropTypes.func,
		onClick: PropTypes.func,
		getComponent: PropTypes.func,
		schema: PropTypes.shape({
			bsStyle: PropTypes.string,
			disabled: PropTypes.bool,
			inProgress: PropTypes.bool,
			name: PropTypes.string,
			label: PropTypes.string,
			triggers: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object, PropTypes.string])),
			type: PropTypes.oneOf(['button', 'submit', 'reset']),
		}),
	};
}

SingleButton.defaultProps = {
	schema: {},
};
