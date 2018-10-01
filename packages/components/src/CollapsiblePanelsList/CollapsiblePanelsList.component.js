import React from 'react';
import VirtualizedList from '../VirtualizedList';
import CollapsiblePanel from '../CollapsiblePanel/CollapsiblePanel.component';
import { CellMeasurer, CellMeasurerCache } from 'react-virtualized';
import css from './CollapsiblePanelsList.scss';

const cache = new CellMeasurerCache({
	fixedWidth: true,
});

const defaultHeight = 60;

class CollapsiblePanelsList extends React.Component {
	state = {};
	toggleRow = (index, measure) => {
		this.setState(
			state => ({ [index]: !state[index], measured: true }),
			() => setTimeout(measure, 0),
		);
	};
	render() {
		return (
			<div className={css['collapsible-panels-list']}>
				<VirtualizedList rowHeight={cache.rowHeight} collection={this.props.items} disableHeader>
					<VirtualizedList.Content
						cellRenderer={props => (
							<CellMeasurer
								cache={cache}
								columnIndex={0}
								key={props.rowIndex}
								parent={props.parent}
								rowIndex={props.rowIndex}
							>
								{({ measure }) => (
									<div
										className={css['collapsible-panels-list-row']}
										style={{ maxHeight: this.state.measured ? 'none' : `${defaultHeight}px` }}
									>
										<CollapsiblePanel
											{...props.rowData}
											onToggle={() => this.toggleRow(props.rowIndex, measure)}
											expanded={this.state[props.rowIndex]}
										/>
									</div>
								)}
							</CellMeasurer>
						)}
					/>
				</VirtualizedList>
			</div>
		);
	}
}

export default CollapsiblePanelsList;
