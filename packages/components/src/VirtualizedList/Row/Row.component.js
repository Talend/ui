import React, { PropTypes } from 'react';
import {
	defaultTableRowRenderer as DefaultTableRowRenderer,
} from 'react-virtualized';
import random from 'lodash/random';
import theme from './RowPlaceholder.scss';

class RowRenderer extends React.Component {
	shouldComponentUpdate(nextProps) {
		// don't update the compnent if already mounted
		if (!this.props.isScrolling && nextProps.isScrolling) {
			return false;
		}
		return true;
	}

	render() {
		const DefaultRowRenderer = this.props.rowRenderer;

		if (this.props.isScrolling) {
			// create a skeleton to avoid many paint during the scroll
			// improve the performance on the browsers
			// waiting guidelines from UX
			return (
				<div
					{...this.props}
				>
					<div
						className={theme['row-placeholder']}
						style={{
							width: `${random(15, 50)}%`,
						}}
					/>
				</div>
			);
		}

		return <DefaultRowRenderer {...this.props} />;
	}
}

RowRenderer.propTypes = {
	...DefaultTableRowRenderer.propTypes,
	rowRenderer: PropTypes.func.isRequired,
};
RowRenderer.displayName = 'VirtualizedList(RowRender)';

export default RowRenderer;
