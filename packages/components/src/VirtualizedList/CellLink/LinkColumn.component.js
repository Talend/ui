import { defaultColumnConfiguration } from '../Content.component';
import CellLink from './CellLink.component';

export const cellType = 'link';
export const linkColumnConfiguration = {
	cellRenderer: props => <CellLink {...props} />,
};

// this is a fake component to be usable in JSX,
// but the element is used as props object internally (VirtualizedList / RV)
export default function LinkColumn() {
	return null;
}
LinkColumn.defaultProps = {
	...defaultColumnConfiguration,
	...linkColumnConfiguration,
};
