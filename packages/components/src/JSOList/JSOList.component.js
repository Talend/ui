import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Toolbar from './Toolbar';
import VirtualizedList from '../VirtualizedList';
import theme from './JSOList.scss';

const ListContext = React.createContext();

class Container extends React.Component {
	static displayName = 'JSOList';
	static propTypes = {
		children: PropTypes.node,
	};
	static defaultProps = {};

	constructor(props) {
		super(props);
		this.onDisplayModeChange = this.onDisplayModeChange.bind(this);
	}

	onDisplayModeChange(event, displayMode) {
		this.setState({ displayMode });
	}

	render() {
		const contextValues = {
			...this.state,
			onDisplayModeChange: this.onDisplayModeChange,
		};
		return <ListContext.Provider value={contextValues}>{this.props.children}</ListContext.Provider>;
	}
}

export default {
	Container,
	Toolbar: props => (
		<ListContext.Consumer>
			{({ displayMode, onDisplayModeChange }) => (
				<Toolbar displayMode={displayMode} onDisplayModeChange={onDisplayModeChange} {...props} />
			)}
		</ListContext.Consumer>
	),
	VirtualizedList: props => (
		<ListContext.Consumer>
			{({ displayMode }) => <VirtualizedList type={displayMode} {...props} />}
		</ListContext.Consumer>
	),
};
