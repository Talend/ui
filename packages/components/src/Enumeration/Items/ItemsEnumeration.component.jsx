import Items from './Items.component';
import { EmptyListPlaceholder } from './EmptyListPlaceholder.component';
import { propTypes } from '../Enumeration.propTypes';
import ItemEditPropTypes from './Item/ItemEdit.propTypes';

export function ItemsEnumeration(props) {
	if (props.items.length > 0) {
		return (
			<Items
				id={props.id}
				items={props.items}
				itemsProp={props.itemsProp}
				currentEdit={props.currentEdit}
				searchCriteria={props.searchCriteria}
				showCheckboxes={props.showCheckboxes}
			/>
		);
	}
	return <EmptyListPlaceholder displayMode={props.displayMode} t={props.t} />;
}

ItemsEnumeration.propTypes = {
	id: propTypes.id,
	items: propTypes.items,
	itemsProp: propTypes.itemsProp,
	searchCriteria: propTypes.searchCriteria,
	showCheckboxes: propTypes.showCheckboxes,
	t: propTypes.t,
	...ItemEditPropTypes,
};
