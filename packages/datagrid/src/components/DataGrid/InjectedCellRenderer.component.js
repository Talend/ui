import React from 'react';
import isEqual from 'lodash/isEqual';
import pick from 'lodash/pick';
import partialRight from 'lodash/partialRight';
import cmf from '@talend/react-cmf';
import Inject from '@talend/react-components/lib/Inject';

import DefaultCellRenderer from '../DefaultCellRenderer';

const cellKeys = ['colDef', 'value', 'data'];
const getCellKeys = partialRight(pick, cellKeys);

export default class InjectedCellRenderer extends React.Component {
	constructor(props) {
		super(props);

		this.state = getCellKeys(props);
	}

	/**
	 * refresh - method call by ag-grid to refresh the data
	 *
	 * @param  {object} params new data
	 * @return {boolean}       return to ag-grid if a the cell was refreshed
	 */
	refresh(params) {
		if (!isEqual(params.data[params.colDef.field], this.state.data[params.colDef.field])) {
			// we receive new data, we have the responsability to set a new state if the data has changed
			this.setState(getCellKeys(params));
			return true;
		}

		return false;
	}

	render() {
		const Component = Inject.get(
			cmf.component.get,
			this.state.colDef.injectedCellRenderer,
			DefaultCellRenderer,
		);

		return (
			<Component
				{...this.state}
				avroRenderer={this.state.colDef.avroRenderer}
				getComponent={cmf.component.get}
			/>
		);
	}
}
