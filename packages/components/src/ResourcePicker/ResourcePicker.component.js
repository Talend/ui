import React from 'react';
import PropTypes from 'prop-types';
import { VirtualizedList } from '../';
import Resource from './Resource'


export default class ResourcePicker extends React.Component {
	static propTypes = {
		collection: PropTypes.arrayOf(PropTypes.object),
	};

	static defaultProps = {};

	render() {
		return (
			<div>
				<VirtualizedList
					collection={this.props.collection}
					type="custom"
					rowRenderers={{ custom: Resource }}
					rowHeight={60}
				/>
			</div>
		);
	}
}
