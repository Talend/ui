import React from 'react';
import PropTypes from 'prop-types';
import CollapsiblePanel from '../../CollapsiblePanel/CollapsiblePanel.component';

// eslint-disable-next-line react/prefer-stateless-function
class PureCollapsiblePanel extends React.PureComponent {
	render() {
		const { rowData, onToggle, onEntered, onExited } = this.props;
		return (
			<CollapsiblePanel
				{...rowData}
				onToggle={onToggle}
				onEntered={onEntered}
				onExited={onExited}
				expanded={rowData.expanded}
			/>
		);
	}
}

PureCollapsiblePanel.propTypes = {
	rowData: PropTypes.object,
	onToggle: PropTypes.func,
	onEntered: PropTypes.func,
	onExited: PropTypes.func,
};

export default PureCollapsiblePanel;
