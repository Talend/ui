import React from 'react';
import PropTypes from 'prop-types';
import CollapsiblePanel from '../../CollapsiblePanel/CollapsiblePanel.component';

// eslint-disable-next-line react/prefer-stateless-function
class PureCollapsiblePanel extends React.PureComponent {
	render() {
		const { rowData, onToggle, measure } = this.props;
		return (
			<CollapsiblePanel
				{...rowData}
				onToggle={event => onToggle(event, measure)}
				expanded={rowData.expanded}
				theme="panel-list"
			/>
		);
	}
}

PureCollapsiblePanel.propTypes = {
	rowData: PropTypes.object,
	onToggle: PropTypes.func,
	measure: PropTypes.func,
};

export default PureCollapsiblePanel;
