/* eslint-disable consistent-return */
import React from 'react';
import PropTypes from 'prop-types';
import ItemsTemplate from './templates/ItemsTemplate.component';
import Items from './Items.component';
import AddButton from './buttons/AddButton.component';
import DeleteButton from './buttons/DeleteButton.component';
import MoveUpButton from './buttons/MoveUpButton.component';
import MoveDownButton from './buttons/MoveDownButton.component';

import FieldsetTemplate from '../../templates/FieldsetTemplate';

import ArrayContext from './context';

export default function ArrayFieldset(props) {
	const { onAdd, onMove, onRemove, nbItems, ...restProps } = props;

	function onMoveItemDown(index) {
		if (index === nbItems - 1) {
			return;
		}
		onMove(index, index + 1);
	}

	function onMoveItemUp(index) {
		if (index === 0) {
			return;
		}
		onMove(index - 1, index);
	}

	return (
		<ArrayContext.Provider value={{ nbItems, onAdd, onRemove, onMoveItemDown, onMoveItemUp }}>
			<FieldsetTemplate {...restProps} />
		</ArrayContext.Provider>
	);
}
ArrayFieldset.Items = Items;
ArrayFieldset.ItemsTemplate = ItemsTemplate;
ArrayFieldset.AddButton = AddButton;
ArrayFieldset.DeleteButton = DeleteButton;
ArrayFieldset.MoveUpButton = MoveUpButton;
ArrayFieldset.MoveDownButton = MoveDownButton;

if (process.env.NODE_ENV !== 'production') {
	ArrayFieldset.propTypes = {
		...FieldsetTemplate.propTypes,
		children: PropTypes.node,
		error: PropTypes.string,
		id: PropTypes.string.isRequired,
		onAdd: PropTypes.func,
		onMove: PropTypes.func,
		onRemove: PropTypes.func,
		value: PropTypes.array,
	};
}
