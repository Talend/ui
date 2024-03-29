import PropTypes from 'prop-types';
import { useListContext } from '../context';
import ColumnChooserButton from '../../Toolbar/ColumnChooserButton';

function ColumnChooser(props) {
	const { columns, visibleColumns, setVisibleColumns } = useListContext();

	return (
		<ColumnChooserButton
			columns={columns.map(({ dataKey, label }, i) => ({
				key: dataKey,
				label,
				hidden: !visibleColumns?.includes(dataKey),
				order: i + 1,
			}))}
			{...props}
			onSubmit={(_, changes) => {
				setVisibleColumns(changes.filter(c => !c.hidden).map(c => c.key));
				if (props.onSubmit) {
					props.onSubmit(_, changes);
				}
			}}
		/>
	);
}

ColumnChooser.propTypes = {
	onSubmit: PropTypes.func,
};

export default ColumnChooser;
