import React from 'react';
import PropTypes from 'prop-types';

export default function ToggleManager(Component) {
	return class ToggledComponentWrapper extends React.Component {
		static displayName = `ToggleManager(${Component.displayName})`;
		static propTypes = {
			onToggle: PropTypes.func,
		};

		constructor(props) {
			super(props);
			this.state = { opened: [], isSingle: false };
			this.onToggle = this.onToggle.bind(this);
		}

		onToggle(event, options, index = 'default') {
			let itemOpened = (this.state.opened && this.state.opened[index]) || [];
			if (options.isOpened) {
				itemOpened = itemOpened.filter(path => path !== options.jsonpath);
			} else {
				itemOpened = itemOpened.concat(options.jsonpath);
			}

			this.setState({
				isSingle: index === 'default',
				opened: {
					...this.state.opened,
					[index]: itemOpened,
				},
			});

			if (this.props.onToggle) {
				this.props.onToggle(event, options, index);
			}
		}

		render() {
			const opened = this.state.isSingle ? this.state.opened.default : this.state.opened;
			return <Component {...this.props} onToggle={this.onToggle} opened={opened} />;
		}
	};
}
